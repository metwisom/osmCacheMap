import {readFileSync} from 'node:fs';

function syncReadFileString(path: string): string {
  return readFileSync(path, {encoding: 'utf-8'});
}

function syncReadFileBuffer(path: string): Buffer {
  return readFileSync(path);
}

export {syncReadFileString, syncReadFileBuffer};