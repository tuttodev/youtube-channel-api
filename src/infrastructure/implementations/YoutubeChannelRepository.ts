import { chromium, Browser } from 'playwright'

import { Video, VideoCreatedAt, VideoImageUrl, VideoTitle, VideoViews } from "../../domain/entities/Video";
import { ChannelRepository } from "../../domain/repositories/ChannelRepository";

export class YoutubeChannelRepository extends ChannelRepository {
  private _url: string

  constructor(channelName: string) {
    super(channelName)

    this._url = `https://www.youtube.com/c/${channelName}/videos`
  }

  async getVideos(): Promise<Video[]> {
    const browser = await chromium.launch({ args: ["--no-sandbox"] })
    const page = await browser.newPage({
      viewport: {
        width: 1920,
        height: 1080
      }
    })
    await page.goto(this._url)

    const videosContainer = await page.locator('ytd-grid-video-renderer')
    const videosTitles = await videosContainer.locator('#video-title').allTextContents()
    const videosViews = await videosContainer.locator('#metadata-line > span:nth-child(1)').allTextContents()
    const videosDates = await videosContainer.locator('#metadata-line > span:nth-child(2)').allTextContents()
    const videosImgs = await videosContainer.locator('#img').elementHandles()


    console.log('Total Videos', videosTitles.length)

    let data: Video[] = []
    let index = 0
    for (const title of videosTitles) {
      const imageurl = await videosImgs[index].getAttribute('src')
      const view = videosViews[index].split(' ')[0].replace(',', '')
      const videoTitle = new VideoTitle(title)
      const videoCreatedAt = new VideoCreatedAt(new Date())
      const videoImageUrl = new VideoImageUrl(imageurl || '')
      const videoViews = new VideoViews(Number(view))

      data.push({
        title: videoTitle,
        createdAt: videoCreatedAt,
        imageUrl: videoImageUrl,
        views: videoViews
      })
      index++
    }

    await browser.close()

    return data
  }
}
