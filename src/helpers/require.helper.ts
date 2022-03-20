import { IRequireAll } from '@declaration/type';
import fs from 'fs';

export const requireAll: IRequireAll = (dirname) => {
  const filter = /^([^\.].*)\.ts(on)?$/;
  const modules: { [key: string | number | symbol]: any } = {};
  const files = fs.readdirSync(dirname);
  files.forEach((file) => {
    let filepath = `${dirname}/${file}`;
    const match = file.match(filter);
    if (match) {
      const name = match[1] || match[0];
      filepath = filepath.substring(0, filepath.lastIndexOf('resolver') + 8);
      modules[name] = require(filepath);
    }
  });

  return modules;
};
