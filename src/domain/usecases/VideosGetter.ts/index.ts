import { NoVideosFoundException } from "../../exceptions/NoVideosFoundException";
import { ChannelRepository } from "../../repositories/ChannelRepository";

export class VideosGetter {
  private _channelRepository: ChannelRepository

  constructor(channelRepository: ChannelRepository) {
    this._channelRepository = channelRepository
  }

  async run() {
    const videos = await this._channelRepository.getVideos()

    if (videos.length === 0)
      throw new NoVideosFoundException()

    return videos
  }
}
