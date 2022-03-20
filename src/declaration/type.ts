export type IRequireAll = (dirname: string) => {
  [key: string | number | symbol]: any;
};
