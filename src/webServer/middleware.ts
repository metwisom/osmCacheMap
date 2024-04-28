import favicon from '../helpers/favicon';
import {Status, StatusValues} from '../helpers/statuses';
import {Response} from './index';
import {tileWorker} from '../tile/tileWorker';

async function middleware(path: string | undefined, zoomLevel: string | undefined, line: string | undefined, filename: string | undefined): Promise<Response> {
  if (path == 'favicon.ico') {
    return {
      code: 200,
      data: favicon,
      headers: {name: 'content-type', value: 'image/x-icon'}
    };
  }

  if (path == 'status') {
    const status = Status.currentStatus;
    console.log('Запрошен режим: *' + status + '*');
    return {
      code: 200,
      data: status,
      headers: {name: 'content-type', value: 'text/plain'}
    };
  }

  if (path == StatusValues.online) {
    status = StatusValues.online;
    console.log('Режим *' + status + '*');
    return {
      code: 200,
      data: 'OK',
      headers: {name: 'content-type', value: 'text/plain'}
    };
  }

  if (path == StatusValues.offline) {
    status = StatusValues.offline;
    console.log('Режим *' + status + '*');
    return {
      code: 200,
      data: 'OK',
      headers: {name: 'content-type', value: 'text/plain'}
    };
  }

  if (path == 'tiles') {

    const path = zoomLevel + '/' + line;
    const pathFile = path + '/' + filename;

    const tile = await tileWorker(path, pathFile);

    if (tile != undefined) {
      return {
        code: 200,
        data: tile,
        headers: {name: 'content-type', value: 'image/png'}
      };
    }


  }

  return {
    code: 404,
    data: 'not found' + filename + line + zoomLevel,
    headers: {name: 'content-type', value: 'text/plain'}
  };
}

export {middleware};