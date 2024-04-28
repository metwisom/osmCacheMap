import {Build} from './build';

async function handle(signal: string) {
  console.log('Отключение *' + signal + '*\n*v' + Build.version + '*');
  process.exit();
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

