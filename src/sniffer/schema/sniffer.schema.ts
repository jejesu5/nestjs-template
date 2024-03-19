import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'Sniffer',
  timestamps: true,
})
export class WebServerSniffer extends Document {
  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: true })
  ip: string;

  @Prop({ type: Object, required: true })
  request: object;

  @Prop({ type: Object, required: true })
  requestHeaders: object;

  @Prop({ type: Object, required: true })
  response: object;

  @Prop({ type: String, required: true })
  method: string;

  @Prop({ type: Number, required: true })
  statusCode: number;

  @Prop({ type: Number, required: true })
  processingTime: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: String })
  userAgent: string;
}

const WebServerSnifferSchema = SchemaFactory.createForClass(WebServerSniffer);

WebServerSnifferSchema.pre('save', function (next) {
  if (this.userId && Types.ObjectId.isValid(this.userId)) {
    this.userId = new Types.ObjectId(this.userId);
  }
  next();
});

export { WebServerSnifferSchema };
