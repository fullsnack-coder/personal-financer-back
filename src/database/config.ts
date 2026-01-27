import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './seeds/init.seeder';

type DatabaseOptions = DataSourceOptions & SeederOptions;

export const dbConfig: DatabaseOptions = {
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  seeds: [InitSeeder],
  factories: ['src/seeds/**/*.factory.ts'],
};
