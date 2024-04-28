import stealTile from '../stealer';
import {Status, StatusValues} from '../helpers/statuses';

async function loadTile(path: string, pathFile: string): Promise<Buffer> {
  const buffer = await stealTile(path, pathFile, Status.currentStatus == StatusValues.online);
  if (buffer == undefined) {
    throw {
      code: 404,
      data: 'tile was not found',
      headers: { name: 'content-type', value: 'text/plain' }
    };
  }
  return buffer;
}

export { loadTile };