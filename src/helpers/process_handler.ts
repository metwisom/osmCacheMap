import {Build} from './build';

async function handle(signal: string) {
  console.log('Отключение ' + signal + '\nver: ' + Build.version);
  process.exit();
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

