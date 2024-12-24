import dotenv from 'dotenv';

interface PropEnv {
  PORT: number;
  MONGO_URI: string;
  REDIS_URI: string;
}

class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private config: PropEnv;

  private constructor() {
    dotenv.config({
      path: '.env'
    });

    this.config = {
      PORT: Number(process.env.PORT) || 3002,
      MONGO_URI: process.env.MONGO_URI || 'ur-mongo',
      REDIS_URI: process.env.REDIS_URI || 'ur-redis'
    };
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  public getConfig(): PropEnv {
    return this.config;
  }
}

export const xenv = EnvironmentConfig.getInstance().getConfig();

