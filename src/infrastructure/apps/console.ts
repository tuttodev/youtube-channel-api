// // @ts-check
// import { chromium } from 'playwright'

import { VideosGetter } from "../../domain/usecases/VideosGetter.ts"
import { YoutubeChannelRepository } from "../implementations/YoutubeChannelRepository"

// (async () => {
//   const browser = await chromium.launch()
//   const page = await browser.newPage({
//     viewport: {
//       width: 1920,
//       height: 1080
//     }
//   })
//   await page.goto('https://www.youtube.com/c/TuCOSMOPOLIS/videos')

//   const videosContainer = await page.locator('ytd-grid-video-renderer')
//   const videosTitles = await videosContainer.locator('#video-title').allTextContents()
//   const videosViews = await videosContainer.locator('#metadata-line > span:nth-child(1)').allTextContents()
//   const videosDates = await videosContainer.locator('#metadata-line > span:nth-child(2)').allTextContents()
//   const videosImgs = await videosContainer.locator('#img').elementHandles()
//   console.log(videosTitles)
//   console.log(videosViews)
//   console.log(videosDates)
//   for (const video of videosImgs) {
//     console.log(await video.getAttribute('src'))
//   }

//   console.log('Total Videos', videosTitles.length)

//   await browser.close()
// })()

(async () => {
  const youtubeChannelRepository = new YoutubeChannelRepository('s4vitar')
  const videosGetter = new VideosGetter(youtubeChannelRepository)

  const videos = await videosGetter.run()
  console.log(videos[0])
})()
