import {Status, StatusValues} from '../helpers/statuses';
import {loadTile} from './loadTile';
import readBuffer from '../helpers/readBuffer';
import {Config} from '../helpers/config';


const tileCache: Record<string, Buffer> = {};

async function tileWorker(path: string, pathFile: string): Promise<Buffer | undefined> {

  const tileName = Config.CACHE_FOLDER + pathFile;

  if (StatusValues.online == Status.currentStatus) {
    tileCache[tileName] = await loadTile(path, pathFile);
  }

  if (tileCache[tileName] == undefined) {
    const buffer = await readBuffer(tileName);
    if (typeof buffer != 'undefined' && buffer.length > 50) {
      tileCache[tileName] = buffer;
    } else {
      tileCache[tileName] = await loadTile(path, pathFile);
    }
  }
  const tile = tileCache[tileName];
  if (tile != undefined && tile.length <= 50) {
    tileCache[tileName] = await loadTile(path, pathFile);
  }

  return tileCache[tileName];

  // if () {
  //   response.setHeader('content-type', 'image/png');
  //   response.end(tileCache[tileName]);
  // } else {
  //   throw {
  //     code: 404,
  //     data: 'tile was not found',
  //     headers: {name: 'content-type', value: 'text/plain'}
  //   };
  // }
}

export {tileWorker};