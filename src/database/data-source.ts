import { DataSource } from 'typeorm';
import { loadEnv } from '@/common/utils/env.loader';
import { getDbConfig } from './config';

loadEnv();

export const AppDataSource = new DataSource(getDbConfig());
