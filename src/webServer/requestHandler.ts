import http from 'http';
import {preMiddleware} from './preMiddleware';
import {middleware} from './middleware';
import {Response} from './index';


const requestHandler = async (request: http.IncomingMessage, response: http.ServerResponse): Promise<void> => {
  const urlPathTarget = preMiddleware(request.url);

  if (urlPathTarget == undefined) {
    response.writeHead(404);
    response.end('');
    return;
  }

  const [path, zoomLevel, line, filename] = urlPathTarget.split('/').filter(Boolean);


  const serverResponse: Response = await middleware(path, zoomLevel, line, filename);

  if (serverResponse.headers != undefined) {
    const {name, value} = <Record<string, string>>serverResponse.headers;
    if (name != undefined && value != undefined) {
      response.setHeader(name, value);
    } else {
      console.log(new Error().stack || 'Error in catch');
    }
  }
  if (serverResponse.code != undefined) {
    response.writeHead(serverResponse.code);
  }
  if (serverResponse.data != undefined) {
    response.end(serverResponse.data);
  }
};

export {requestHandler};