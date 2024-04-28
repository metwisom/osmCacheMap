import fs from 'fs';

export default function readBuffer(url: string): Promise<Buffer | boolean> {
  const file: Buffer[] = [];
  return new Promise(r => {
    if (!fs.existsSync(url)) {
      return r(false);
    }
    fs.createReadStream(url)
      .on('data', data => file.push(typeof data == 'string' ? Buffer.from(data) : data))
      .on('end', () => r(Buffer.concat(file)));
  });
}
