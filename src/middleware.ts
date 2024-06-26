import {favicon} from './helpers/favicon';
import {Status, StatusValues} from './helpers/statuses';
import {tileWorker} from './tile/tileWorker';
import {Request} from './webServer/request';
import {Middleware} from './webServer/middleware';

const middleware: Middleware = async function (request: Request, [command, zoom, line, file]: string[]): Promise<void> {
  request.response.setHeader('Connection', 'keep-alive');
  request.response.setHeader('Keep-Alive', 'timeout=5');
  request.response.setHeader('Transfer-Encoding', 'chunked');
  switch (command) {
  case 'favicon.ico':
    return request.responseXIcon(favicon);
  case StatusValues.online:
    Status.currentStatus = StatusValues.online;
    return request.responsePlain('OK');
  case StatusValues.offline:
    Status.currentStatus = StatusValues.offline;
    return request.responsePlain('OK');
  case 'status':
    return request.responsePlain(Status.currentStatus);
  case 'tiles':
    await (async () => {
      const path = zoom + '/' + line;
      const pathFile = path + '/' + file;

      const tile = await tileWorker(path, pathFile);
      if (tile) {
        return request.responsePng(tile);
      }
    })();
    break;

  default:
    return request.responseNotFound();
  }
};

export {middleware};