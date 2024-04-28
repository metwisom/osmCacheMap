import {favicon} from '../helpers/favicon';
import {Status, StatusValues} from '../helpers/statuses';
import {tileWorker} from '../tile/tileWorker';
import {Request} from './request';

async function middleware(request: Request, params: string[]): Promise<void> {
  if (params[0] == 'favicon.ico') {
    return request.responseXIcon(favicon);
  }

  if (params[0] == 'status') {
    return request.responsePlain(Status.currentStatus);
  }

  if (params[0] == StatusValues.online) {
    Status.currentStatus = StatusValues.online;
    return request.responsePlain('OK');
  }

  if (params[0] == StatusValues.offline) {
    Status.currentStatus = StatusValues.offline;
    return request.responsePlain('OK');
  }

  if (params[0] == 'tiles') {

    const path = params[1] + '/' + params[2];
    const pathFile = path + '/' + params[3];

    const tile = await tileWorker(path, pathFile);

    if (tile != undefined) {
      return request.responsePng(tile);
    }


  }

  return request.responseNotFound();
}

export {middleware};