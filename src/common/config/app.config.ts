import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';
import { AppEnvironment } from '../types/app.config';

const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(AppEnvironment.Development, AppEnvironment.Production)
    .default(AppEnvironment.Development),
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().allow('').required(),
  DATABASE_NAME: Joi.string().required(),
});

const serverConfig = () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 3306,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

const commonConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  validationSchema: configValidationSchema,
  load: [serverConfig],
};

const environmentsConfig: Record<AppEnvironment, ConfigModuleOptions> = {
  [AppEnvironment.Development]: {
    envFilePath: '.env.development',
  },
  [AppEnvironment.Staging]: {
    envFilePath: '.env.staging',
  },
  [AppEnvironment.Production]: {
    ignoreEnvFile: true,
  },
};

const getAppConfig = (): ConfigModuleOptions => {
  const nodeEnv = process.env.NODE_ENV || AppEnvironment.Development;

  return {
    ...commonConfig,
    ...environmentsConfig[nodeEnv],
  };
};

export const appConfig = getAppConfig();
