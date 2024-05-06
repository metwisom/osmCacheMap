import http from 'node:http';
import {Request} from './request';
import {Middleware} from './middleware';


class Server {
  middleware: Middleware = (): Promise<void> => Promise.resolve();

  setMiddleware(middleware: Middleware): this {
    this.middleware = middleware;
    return this;
  }

  start(port: number): Promise<void> {
    return new Promise((resolve) => {
      http.createServer((req, res) => new Request(req, res, this.middleware).handle())
        .listen(port, resolve);
    });
  }
}

export {Server};