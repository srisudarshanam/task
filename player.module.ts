import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { player,playerschema } from 'src/schema/player.schema';
import { playerservice } from './player.service';
import { playercontroller } from './player.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: player.name,
                schema: playerschema,
            },
        ]),
    ],
    providers: [playerservice],
    controllers: [playercontroller],
    //exports: [MongooseModule]
})
export class playermodule {}