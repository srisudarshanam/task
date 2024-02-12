import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";
@Schema()

export class team {
     
  @Prop({ required: true, default: uuidv4 })
   _id: string; // UUID for player

   @Prop({ required: true })
    playerid: string ;

   @Prop({ required: true })
    name: string;

    @Prop({required: true })
    sport: string;

    @Prop({required: true })
    coach: string;

    @Prop({required: true })
    country: string;

    @Prop({required: false })
    count: number;


}
  export const teamschema = SchemaFactory.createForClass(team);