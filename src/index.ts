import {Server} from './webServer';
import './helpers/process_handler';
import {Config} from './helpers/config';
import {Build} from './helpers/build';
import {Status} from './helpers/statuses';
import {middleware} from './middleware';


new Server()
  .setMiddleware(middleware)
  .start(Config.HTTP_PORT)
  .then(() => {
    const version = Build.version;
    const status = Status.currentStatus.toUpperCase();
    const config = process.env['config'];
    console.log(`Запуск, режим ${status}\nver: ${version}, env ${config}`);
  });


