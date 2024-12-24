import mongoose from 'mongoose';
import { xenv } from './setting';

export class MongoDBConnection {
  private static instance: MongoDBConnection;

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): MongoDBConnection {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
    }
    return MongoDBConnection.instance;
  }

  private setupEventListeners(): void {
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(xenv.MONGO_URI);
      console.log('MongoDB Connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB disconnected successfully');
    } catch (error) {
      console.error('MongoDB disconnection error:', error);
    }
  }
}

// Usage example:
// const mongoConnection = MongoDBConnection.getInstance();
// await mongoConnection.connect();