import http from 'http';
import {Config} from '../helpers/config';
import {Request} from './request';
import {Build} from '../helpers/build';
import {Status} from '../helpers/statuses';


class Server {
  create(): void {
    http.createServer((req, res) => new Request(req, res).handle())
    .listen(Config.HTTP_PORT, () => {
      const version = Build.version;
      const status = Status.currentStatus.toUpperCase();
      const config = process.env['config'];
      console.log(`Запуск, режим ${status}\nver.${version}, env ${config}`);
    });
  }
}

export {Server};