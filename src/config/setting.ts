import dotenv from 'dotenv';
interface PropEnv {
  PORT: number;
  MONGO_URI: string;
  REDIS_URI: string;
}
dotenv.config({
  path: '.env'
});

const xenv: PropEnv = {
  PORT: Number(process.env.PORT) || 3002,
  MONGO_URI: process.env.MONGO_URI || 'ur-mongo',
  REDIS_URI: process.env.REDIS_URI || 'ur-redis'
};

export { xenv };

