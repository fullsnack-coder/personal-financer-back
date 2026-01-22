import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './seeds/init.seeder';

type DatabaseOptions = DataSourceOptions & SeederOptions;

export const dbConfig: DatabaseOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST || '192.168.1.35',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'example',
  database: process.env.DB_NAME || 'personal_financer',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  seeds: [InitSeeder],
  factories: ['src/seeds/**/*.factory.ts'],
};
