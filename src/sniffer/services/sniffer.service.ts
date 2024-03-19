import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebServerSniffer } from '../schema/sniffer.schema';

@Injectable()
export class SnifferService {
  constructor(
    @InjectModel(WebServerSniffer.name)
    private snifferModel: Model<WebServerSniffer>,
  ) {}

  async create(data) {
    const createdSniffer = new this.snifferModel(data);
    return createdSniffer.save();
  }

  async findAll() {
    return this.snifferModel.find().exec();
  }
}
