import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { team,teamschema } from 'src/schema/team.schema';
import { teamservice } from './team.service';
import { teamcontroller } from './team.controller';

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: team.name,
                schema: teamschema,
            },
        ]),
       
    ],
    providers: [teamservice],
    controllers: [teamcontroller],
})
export class teammodule {}