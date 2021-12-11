import { Router, Request, Response } from 'express';
import VideosGetController from '../controllers/VideosGetController';

export const register = (router: Router) => {
  const videosGetController = new VideosGetController()
  router.get('/youtube-videos/:channel', (req: Request, res: Response) => videosGetController.run(req, res));
};
