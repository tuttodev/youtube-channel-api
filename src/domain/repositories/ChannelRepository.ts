import { Video } from "../entities/Video";

export abstract class ChannelRepository {
  protected _channelName: string

  constructor(channelName: string) {
    this._channelName = channelName
  }

  abstract getVideos(): Promise<Video[]>
}
