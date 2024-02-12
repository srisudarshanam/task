import { Body, Controller,Get,Post, Put,UsePipes,ValidationPipe,Query,HttpException,HttpStatus } from '@nestjs/common';
import { playerservice } from './player.service';
import { createplayerDto } from './createplayer.dto';
import { GetPlayersDto}from './getplayers.dto';
//import { UpdatePlayerDto } from './dto/update-player.dto';
import { player } from 'src/schema/player.schema';

//import * as mongoose from 'mongoose';
//import { createplayerDto } from './createplayer.dto';



@Controller('player')
export class playercontroller {
    constructor(private playerservice:playerservice) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createplayer(@Body() createplayerDto: createplayerDto) {
       console.log(createplayerDto);

       try {
        const result = this.playerservice.create(createplayerDto);
        return { success: true, message: 'Player created successfully', result };
      } catch (error) {
        return { success: false, message: 'Failed to create player', error: error.message };
      }
        //return this.playerservice.create(createplayerDto);
    }
  
        //@Get()
        //getAllPlayers() {
            //return this.playerservice.findAll();
        //}

        //@Get()
        //getplayers(@Query() filters?: { name?: string; age?: number; position?: string; role?: string }) {
         // return this.playerservice.getsplayers(filters);
  


  //@Get()
  //async getplayers(@Query() filters?: { name?: string; age?: number; position?: string; role?: string }) {
   // try{
    // Original code for fetching players
    //const players = await this.playerservice.getsplayers(filters);

    // Additional code for fetching players sorted by age in descending order
    //const playersDescendingAge = await this.playerservice.getsplayers({}, 'age', 'desc');



    @Get()
  @UsePipes(new ValidationPipe())
  async getplayers(@Query() filters: GetPlayersDto): Promise<{ success: boolean, message: string, players?: player[], playersDescendingAge?: player[], error?: string }> {
    try {
      const players = await this.playerservice.getsplayers(filters);
      
      if (players.length === 0) {
        throw new HttpException(
          { success: true, message: 'No matching players found', status: HttpStatus.NOT_FOUND },
          HttpStatus.NOT_FOUND,
        );
      }

    const playersDescendingAge = await this.playerservice.getsplayers({}, 'age', 'desc');


    // Check if no players are found based on specific conditions
    // Combine the results or use them as needed//return { players, playersDescendingAge };
    return { success: true, message: 'Players fetched successfully', players, playersDescendingAge };
    
   } catch (error) {
    return { success: true, message: 'Failed to fetch players', error: error.message };
  }
   }

   
}


  

    
  
    

    //@Post()
    //async createplayer(
       // @Body()
        //player,
    //): Promise<player> {
        //return this.playerservice.create(player);
    //}
    
    //@Get()
     //async getAllplayers(): Promise<player[]>  {
        //return this.playerservice.findAll();
     //}
    //}

    //@Controller('player')
//@UseGuards(AuthGuard)
//@UseInterceptors(LoggingInterceptor)
//export class playercontroller {
  //constructor(private readonly playerservice: playerservice) {}

  //@Post()
  //create(@Body() createplayerDto: createplayerDto) {
    //return this.playerservice.create(createplayerDto);
