import {Status, StatusValues} from '../helpers/statuses';
import {loadTile} from './loadTile';
import {readBuffer} from '../helpers/readBuffer';
import {Config} from '../helpers/config';


const tileCache: Record<string, Buffer | null> = {};

async function tileWorker(path: string, pathFile: string): Promise<Buffer | null> {

  const tileName = Config.CACHE_FOLDER + pathFile;

  if (StatusValues.online == Status.currentStatus) {
    return loadTile(path, pathFile)
      .then(tile => tileCache[tileName] = tile);
  }

  if (tileCache[tileName] === undefined) {
    await readBuffer(tileName)
      .then(buffer => {
        tileCache[tileName] = buffer;
      })
      .catch(async err => {
        console.log('Err: ' + err);
        tileCache[tileName] = await loadTile(path, pathFile);
      });
  }

  return tileCache[tileName] ?? null;
}

export {tileWorker};