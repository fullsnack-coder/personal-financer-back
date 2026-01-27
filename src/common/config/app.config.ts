import { ConfigModuleOptions } from '@nestjs/config';
import Joi from 'joi';
import { AppEnvironment } from '../types/app.config';
import { loadEnv } from '../utils/env.loader';
import { isDevelopment } from '../utils/environments';

const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      AppEnvironment.Development,
      AppEnvironment.Production,
      AppEnvironment.Staging,
    )
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
  envFilePath: loadEnv(),
  ignoreEnvFile: !isDevelopment(),
  validationSchema: configValidationSchema,
  load: [serverConfig],
};

const getAppConfig = (): ConfigModuleOptions => {
  return {
    ...commonConfig,
  };
};

export const appConfig = getAppConfig();
