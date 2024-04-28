import mkdirp from 'mkdirp';
import fs from 'fs';
import fetch from 'node-fetch';
import Config from './config';

const hosts = Config.HOSTS;

const getHost = () => hosts[Math.floor(Math.random() * hosts.length)];

export default async (path: string, pathFile: string, force: boolean): Promise<Buffer> => {
  let exist = fs.existsSync(Config.CACHE_FOLDER + pathFile);
  if (!exist || force) {
    await mkdirp(Config.CACHE_FOLDER + path + '/');
    exist = fs.existsSync(Config.CACHE_FOLDER + pathFile);
    if (exist) {
      fs.unlink(Config.CACHE_FOLDER + pathFile, (err) => { if (err) console.error(err); });
    }
    return new Promise((resolve, reject) => {

      fetch(getHost() + `/${pathFile}`, {
        method: 'get',
        'headers': {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Host': 'tile.openstreetmap.org',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
          'X-Amzn-Trace-Id': 'Root=1-60670072-292465ff1f3597ed3cc9f4a2'
        }
      })
        .then(async res => {
          const responseBuffer = await res.buffer();
          const responseText = responseBuffer.toString();
          if (responseText == 'Access denied.') {
            throw 'openstreetmap возвращает "Access denied."';
          }
          return responseBuffer;
        })
        .then(async blob => {
          const data = new Uint8Array(blob);
          fs.writeFile(Config.CACHE_FOLDER + pathFile, data, (err) => {
            if (err) reject(err);
            console.log('The file has been saved!');
            resolve(blob);
          });
        })
        .catch(() => resolve(Buffer.from('')));
    });
  }
  return Buffer.from('');

};