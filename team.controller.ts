import { Body, Controller,Get,Post,UsePipes,ValidationPipe,Query,Param } from '@nestjs/common';
import { teamservice } from './team.service';
import { createteamDto } from './createteam.dto';
//import * as mongoose from 'mongoose';
//import { createplayerDto } from './createplayer.dto';



@Controller('team')
export class teamcontroller {
    constructor(private teamservice:teamservice) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createteam(@Body() createteamDto: createteamDto) {
       console.log(createteamDto);
        return this.teamservice.create(createteamDto);
    }

    @Get()
  getteams(@Query() filters?: { name?: string; count?: number; coach?: string; country?: string }) {
    return this.teamservice. getsteams(filters);
  }
  
  @Get(':id')
 async getTeam(@Param('id') id: string) {
  return this.teamservice.getTeamsWithPlayerDetails( id );
}

}


    