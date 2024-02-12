import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from "uuid";

@Schema()

export class player {
     
  @Prop({ required: true, default: uuidv4 })
   _id: string; // UUID for player

    @Prop({ required: true })
    playername: string;

    @Prop({required: true})
    playerage: number;

    @Prop({required: true})
    playerrole: string;

    @Prop({required: true})
    playerposition: string;

    @Prop({required: true})
    playerruns: number;

    @Prop({required: true})
    playerwickets: number;

    @Prop({required: true})
    playerhighscore: number;

    @Prop({required: false})
    playercatches: number;

}
  export const playerschema = SchemaFactory.createForClass(player);
