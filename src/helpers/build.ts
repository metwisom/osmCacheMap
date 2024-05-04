import {syncReadFileString} from '../core/reader';

type build = {
  version: string
}

const content = syncReadFileString('./package.json');
const Build: build = JSON.parse(content);

export {Build};
