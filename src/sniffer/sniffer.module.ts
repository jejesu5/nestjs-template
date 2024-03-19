import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WebServerSniffer,
  WebServerSnifferSchema,
} from './schema/sniffer.schema';
import { SnifferService } from './services/sniffer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WebServerSniffer.name,
        schema: WebServerSnifferSchema,
      },
    ]),
  ],
  providers: [SnifferService],
  exports: [SnifferService],
})
export class SnifferModule {}
