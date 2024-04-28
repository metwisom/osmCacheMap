import fs from 'fs';

const favicon = fs.readFileSync(__dirname + '/../../resource/favicon.ico');
export default favicon;

