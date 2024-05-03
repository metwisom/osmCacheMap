import http from 'http';
import {Middleware} from './middleware';

class Request {
  request: http.IncomingMessage;
  response: http.ServerResponse;
  middleware: Middleware;

  constructor(request: http.IncomingMessage, response: http.ServerResponse, middleware: Middleware) {
    this.request = request;
    this.response = response;
    this.middleware = middleware;
  }

  responseNotFound(): void {
    this.response.writeHead(404);
    this.response.end('');
  }

  responseBadRequest(): void {
    this.response.writeHead(400);
    this.response.end('');
  }

  responseXIcon(data: Buffer): void {
    this.response.setHeader('content-type', 'image/x-icon');
    this.response.writeHead(200);
    this.response.end(data);
  }

  responsePng(data: Buffer): void {
    this.response.setHeader('content-type', 'image/png');
    this.response.writeHead(200);
    this.response.end(data);
  }

  responsePlain(data: string): void {
    this.response.setHeader('content-type', 'text/plain');
    this.response.writeHead(200);
    this.response.end(data);
  }

  parseUrl(): string | undefined {
    if (this.request.url == undefined) {
      return undefined;
    }
    const pathBody = this.request.url.split('?');
    const path = pathBody[0];
    if (path == undefined) {
      return undefined;
    }
    return path;
  }

  async handle(): Promise<void> {
    const urlPathTarget = this.parseUrl();

    if (urlPathTarget == undefined) {
      return this.responseBadRequest();
    }

    const params = urlPathTarget.split('/').filter(Boolean);

    await this.middleware(this, params);
    return;

  }
}

export {Request};