import { DEVELOPMENT } from './development';
import { PRODUCTION } from './production';
const env = process.env.NODE_ENV || 'development';

export const CONFIG = env === 'PRODUCTION' ? PRODUCTION : DEVELOPMENT;
