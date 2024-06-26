import mkdirp from 'mkdirp';
import {Config} from '../helpers/config';
import fs from 'node:fs';
import fetch from 'node-fetch';

const hosts = Config.HOSTS;

const getHost = () => hosts[Math.floor(Math.random() * hosts.length)];

async function loadTile(path: string, pathFile: string): Promise<Buffer | null> {

  await mkdirp(Config.CACHE_FOLDER + path + '/');

  return new Promise((resolve, reject) => {
    const exist = fs.existsSync(Config.CACHE_FOLDER + pathFile);
    if (exist) {
      fs.unlink(Config.CACHE_FOLDER + pathFile, (err) => {
        if (err) reject(err);
      });
    }

    fetch(getHost() + `/${pathFile}`, {
      method: 'get',
      'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Host': 'tile.openstreetmap.org',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        'X-Amzn-Trace-Id': 'Root=1-60670072-292465ff1f3597ed3cc9f4a2',
      },
    })
      .then(async res => {
        const responseBuffer = await res.buffer();
        const responseText = responseBuffer.toString();
        if (responseText == 'Access denied.') {
          reject('openstreetmap возвращает "Access denied."');
        }
        if(res.status == 400){
          reject('openstreetmap возвращает "Access denied."');
        }
        return responseBuffer;
      })
      .then(async blob => {
        const data = new Uint8Array(blob);
        if (data.length > 49) {
          fs.writeFile(Config.CACHE_FOLDER + pathFile, data, (err) => {
            if (err) reject(err);
            resolve(blob);
          });
        }
      })
      .catch(() => reject(null));
  });


}

export {loadTile};