import fs from 'fs';

type build = {
  version: string
}

const content = fs.readFileSync(__dirname + '/../../package.json', {encoding: 'utf-8'});
const Build: build = JSON.parse(content);

export {Build};
