import * as path from 'path';
import * as dotenv from 'dotenv';
import { AppEnvironment } from '../types/app.config';

export const loadEnv = () => {
  const nodeEnv = process.env.NODE_ENV || AppEnvironment.Development;

  let envFile = '.env';

  switch (nodeEnv as AppEnvironment) {
    case AppEnvironment.Development:
      envFile = '.env.development';
      break;
    case AppEnvironment.Staging:
      break;
    case AppEnvironment.Production:
      return;
  }

  dotenv.config({
    path: path.resolve(process.cwd(), envFile),
  });

  return envFile;
};
