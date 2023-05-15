import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUserProvider } from 'interface/Enum/IUserProvider';
import { IZoom } from 'interface/Model/IZoom';
import { GenericSchema } from './generic.schema';
import { IsString } from 'class-validator';

@Schema()
export class Zoom extends GenericSchema implements IZoom {
  @Prop()
  id:string;

  @Prop()
  host_id:  string;

  @Prop()
  topic :  string;

  @Prop()
  type:  string;

  @Prop()
  start_time:  string;
  
  @Prop()
  end_time:  string;

  @Prop()
  duration:  string;

  @Prop()
  timezone:  string;

  @Prop()
  account_id:  string;

  // @Prop()
  // object: object;

  @Prop()
  event:  string;

  @Prop()
  event_ts:  string;

  // @Prop()
  // payload: object;

}

export const ZoomSchema = SchemaFactory.createForClass(Zoom);
