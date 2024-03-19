import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SnifferInterceptor } from './sniffer/sniffer.interceptor';
import { SnifferModule } from './sniffer/sniffer.module';
import { ConfigModule } from '@nestjs/config';
import config from './shared/config';
import { MongoClient } from './database/mongoClient';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongoClient.create(),
    AuthModule,
    SnifferModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: SnifferInterceptor,
    },
  ],
})
export class AppModule {}
