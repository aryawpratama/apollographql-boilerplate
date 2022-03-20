const env =
  process.env.NODE_ENV === "development"
    ? __dirname + "/src"
    : __dirname + "/dist";
module.exports = {
  type: process.env.DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [`${env}/database/entities/**/*{.ts,.js}`],
  migrations: [`${env}/database/migrations/**/*{.ts,.js}`],
  subscribers: [`${env}/database/subscribers/**/*{.ts,.js}`],
  seeds: [`${env}/database/seeds/**/*{.ts,.js}`],
  factories: [`${env}/database/factories/**/*{.ts,.js}`],
  cli: {
    entitiesDir: "src/database/entities/",
    migrationsDir: "src/database/migrations/",
    subscribersDir: "src/database/subscribers/",
  },
};
