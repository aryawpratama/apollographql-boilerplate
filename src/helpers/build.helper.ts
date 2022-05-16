import fs from 'fs';
import path from 'path';

const dist = path.join(__dirname.substring(0, __dirname.length - 11), 'dist');
const exception = ['index.d.ts', 'index.js', 'index.js.map'];
const deleteFolderRecursive = (Path: string) => {
  if (fs.existsSync(Path)) {
    fs.readdirSync(Path).forEach((file) => {
      if (!exception.includes(file)) {
        const curPath = path.join(Path, file);
        fs.rmSync(curPath, { recursive: true });
      }
    });
  }
};

deleteFolderRecursive(dist);
