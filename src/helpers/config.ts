import fs from 'fs';

type config = {
    HTTP_PORT: number,
    CACHE_FOLDER: string,
    HOSTS: string[]
}

const configType = (process.env['config'] || 'development');

const content = fs.readFileSync(__dirname + '/../../config/config.' + configType + '.json', { encoding: 'utf-8' });
const Config: config = JSON.parse(content);
export {Config};
