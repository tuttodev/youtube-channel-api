import express, { Request, Response } from 'express'
import * as http from 'http'
import httpStatus from 'http-status'
import { registerRoutes } from './routes';
import Router from 'express-promise-router';

export class Server {
  private _port: number | string
  private _express: express.Express
  private _httpServer?: http.Server

  constructor(port: number | string) {
    this._port = port
    this._express = express()
    const router = Router()
    this._express.use(router);

    registerRoutes(router)

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  start() {
    this._httpServer = this._express.listen(this._port, () => {
      console.log(`server started in port ${this._port}`)
    })
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._httpServer) {
        this._httpServer.close(error => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    });
  }

}
