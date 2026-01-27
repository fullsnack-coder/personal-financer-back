import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from './seeds/init.seeder';
import { isDevelopment } from '@/common/utils/environments';

type DatabaseOptions = DataSourceOptions & SeederOptions;

export const getDbConfig = (): DatabaseOptions => ({
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [isDevelopment() ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'],
  migrations: [
    isDevelopment()
      ? 'src/database/migrations/*.ts'
      : 'dist/database/migrations/*.js',
  ],
  synchronize: false,
  seeds: [InitSeeder],
  factories: [
    isDevelopment()
      ? 'src/database/factories/*.factory.ts'
      : 'dist/database/factories/*.factory.js',
  ],
});
