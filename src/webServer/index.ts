import http from 'http';
import Config from '../config';
import {requestHandler} from './requestHandler';
import Build from '../build';
import {Status} from '../helpers/statuses';

const version = Build.version;


export type Response = {
  code: number,
  data: string | Buffer,
  headers: { name: 'content-type', value: 'text/plain' | 'image/x-icon' | 'image/png' }
}


class Server {

  create(): void {
    http.createServer(requestHandler)
      .listen(Config.HTTP_PORT, () => {
        console.log('Запуск, режим *' + Status.currentStatus + '* \n*v' + version + '* env ' + process.env['config']);
      });
  }
}

export default Server;