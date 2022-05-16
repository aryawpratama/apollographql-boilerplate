import { IRequireAll } from '@declaration/type';
import fs from 'fs';

export const requireAll: IRequireAll = (dirname) => {
  const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  const filter = /^([^\.].*)\.ts(on)?$/;
  const filterProd = /^([^\.].*)\.js(on)?$/;
  const modules: { [key: string | number | symbol]: any } = {};
  const files = fs.readdirSync(dirname);

  files.forEach((file) => {
    let filepath = `${dirname}/${file}`;
    const match = file.match(isProd ? filterProd : filter);

    if (match) {
      const name = match[1] || match[0];
      filepath = filepath.substring(0, filepath.lastIndexOf('resolver') + 8);
      modules[name] = require(filepath);
    }
  });

return modules;
};
