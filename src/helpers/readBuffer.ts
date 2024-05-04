import fs from 'node:fs';
import {syncReadFileBuffer} from '../core/reader';

function readBuffer(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      return reject('tile not found on disk');
    }
    resolve(syncReadFileBuffer(path));
  });
}

export {readBuffer};