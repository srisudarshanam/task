import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { team } from 'src/schema/team.schema';
import { createteamDto } from './createteam.dto';



@Injectable()
export class teamservice {
  constructor(@InjectModel(team.name) private teamModel: Model<team>,
  //@InjectModel(player.name) private playerModel: Model<player> // Inject Player model
  ) {}

  async create(createteamDto: createteamDto): Promise<team> {
    const createdteam = new this.teamModel(createteamDto);
    return createdteam.save();
  }

  async getsteams(filters?: { name?: string; count?: number; coach?: string; country?: string }): Promise<team[]> {
    const query: any = {};
    if (filters) {
      if (filters.name) {
        query.name = { $regex: new RegExp(filters.name, 'i') };
      }
      if (filters.count) query.count = filters.count;
      if (filters.coach) query.coach = { $regex: new RegExp(filters.coach, 'i') };
      if (filters.country) query.country = { $regex: new RegExp(filters.country, 'i') };
    }
    return this.teamModel.find(query).exec();
  }
  
async getTeamsWithPlayerDetails(teamId: string) {
  return this.teamModel.aggregate([
    {
      $match: {
        _id: teamId // Match the teamId
      }
    },
    {
      $lookup: {
        from: 'players', 
        localField: 'playerid',
        foreignField: '_id',
        as: 'players' 
      }
    },
    {
      $unwind: '$players',
     },
        {
         $project: {
           _id: 1,
             playerid: 1,
             name: 1,
            sport: 1,
            coach: 1,
            country: 1,
             count: 1,
           player_id:      '$players.playerid',
           playername:     '$players.playername',
           playerage:      '$players.playerage',
           playerrole:     '$players.playerrole',
           playerposition: '$players.playerposition',
           playerruns:     '$players.playerruns',
           playerwickets:  '$players.playerwickets',
           playerhighscore:'$players.playerhighscore'
        }
        },
    
  ]).exec();
}
}

//async updateTeam(id: string, updateTeamDto: createteamDto): Promise<team> {
 // const updatedTeam = await this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true });
  //if (!updatedTeam) {
   // throw new NotFoundException(`Team with id ${id} not found`);
 // }
 // return updatedTeam;

//}


