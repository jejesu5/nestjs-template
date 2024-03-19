import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../shared/config';
import { Logger } from '@nestjs/common';

export class MongoClient {
  private static logger = new Logger('MongoClient');
  static create() {
    return MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        uri: configService.MONGO_DATABASE_URL,
        retryAttempts: 1000000,

        connectionFactory: (connection) => {
          this.logger.log('Connected to mongoDB');
          return connection;
        },

        connectionErrorFactory: (error) => {
          this.logger.error('Error connecting to mongoDB');
          console.log(error);
          return error;
        },
      }),
      inject: [config.KEY],
    });
  }
}
