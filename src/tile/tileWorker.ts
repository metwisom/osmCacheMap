import {Status, StatusValues} from '../helpers/statuses';
import {loadTile} from './loadTile';
import {readBuffer} from '../helpers/readBuffer';
import {Config} from '../helpers/config';


const tileCache: Record<string, Buffer | null> = {};

function clearCache(): void {
  for (const item in tileCache) {
    delete tileCache[item];
  }
}

async function tileWorker(path: string, pathFile: string): Promise<Buffer | null> {

  const tileName = Config.CACHE_FOLDER + pathFile;

  if (StatusValues.online == Status.currentStatus) {
    return loadTile(path, pathFile)
    .then(tile => tileCache[tileName] = tile);
  }
  console.log(tileName);
  if (tileCache[tileName] === undefined) {
    await readBuffer(tileName)
    .then(buffer => {
      tileCache[tileName] = buffer;
    })
    .catch(async _ => {
      await loadTile(path, pathFile)
      .then(file => {
        console.log(file)
        tileCache[tileName] = file;
      }).catch(e => console.log(e));
    });
  }

  return tileCache[tileName] ?? null;
}

export {tileWorker, clearCache};