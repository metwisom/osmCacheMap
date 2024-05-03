import fs from 'fs';

function readBuffer(path: string): Promise<Buffer> {
  const file: Buffer[] = [];
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path)) {
      return reject('tile not found on disk');
    }
    fs.createReadStream(path)
      .on('data', data => file.push(typeof data == 'string' ? Buffer.from(data) : data))
      .on('end', () => resolve(Buffer.concat(file)));
  });
}

export {readBuffer};