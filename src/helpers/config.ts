import {syncReadFileString} from '../core/reader';

type config = {
  HTTP_PORT: number,
  CACHE_FOLDER: string,
  HOSTS: string[]
}

const configType = (process.env['config'] || 'development');
const content = syncReadFileString(`./config/config.${configType}.json`);
const Config: config = JSON.parse(content);
export {Config};
