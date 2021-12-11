import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { VideosGetter } from '../../../../../domain/usecases/VideosGetter.ts';
import { YoutubeChannelRepository } from '../../../../implementations/YoutubeChannelRepository';
import { Controller } from './Controller';

export default class VideosGetController implements Controller {
  async run(req: Request, res: Response) {
    const { channel } = req.params

    const youtubeChannelRepository = new YoutubeChannelRepository(channel)
    const videosGetter = new VideosGetter(youtubeChannelRepository)

    const videos = await videosGetter.run()

    res.status(httpStatus.OK).json(videos);
  }
}
