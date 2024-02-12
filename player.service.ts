import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { player } from 'src/schema/player.schema';
import { createplayerDto } from './createplayer.dto';

//@Injectable()
 // export class playerservice {
    //constructor(
        //@InjectModel(player.name) 
         //private playerModel: Model<player>) {}

     //async create(player: player) {
        //const res = await this.playerModel.create(player);
         //return res
    //}
    //async findAll(): Promise<player[]> {
        //const players = await this.playerModel.find();
        //return players;
   // }
    
//}

@Injectable()
export class playerservice {
  constructor(@InjectModel(player.name) private playerModel: Model<player>) {}

  async create(createplayerDto: createplayerDto): Promise<player> {
    const createdplayer = new this.playerModel(createplayerDto);
    return createdplayer.save();
  }

  //async getsplayers(filters?: { name?: string; age?: number; position?: string; role?: string }): Promise<player[]> {
    //const query: any = {};
    //if (filters) {
      //if (filters.name) query.name = filters.name;
      //if (filters.age) query.age = filters.age;
      //if (filters.position) query.position = filters.position;
      //if (filters.role) query.role = filters.role;
    //}
    //return this.playerModel.find(query).exec();
    //async getsplayers(filters?: { name?: string; age?: number; position?: string; role?: string }): Promise<player[]> {
      //const query: any = {};
      //if (filters) {
        //if (filters.name) {
          //query.name = { $regex: new RegExp(filters.name, 'i') };
        //}
        //if (filters.age) query.age = filters.age;
        //if (filters.position) query.position = { $regex: new RegExp(filters.position, 'i') };
        //if (filters.role) query.role = { $regex: new RegExp(filters.role, 'i') };
      //}
      //return this.playerModel.find(query).exec();
    //}
  //}

//async findAll(): Promise<player[]> {
  //return this.playerModel.find().exec();
 //}

 //getsplayers(){
  //return this .playerModel.find();

  //async findAll(): Promise<player[]> {
    //return this.playerModel.find().exec();
  //}
  async getsplayers(
    filters?: { name?: string; age?: number; position?: string; role?: string },
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc', // Default to ascending order
  ): Promise<player[]> {
    const query: any = {};
    if (filters) {
      if (filters.name) {
        query.name = { $regex: new RegExp(filters.name, 'i') };
      }
      if (filters.age) query.age = filters.age;
      if (filters.position) query.position = { $regex: new RegExp(filters.position, 'i') };
      if (filters.role) query.role = { $regex: new RegExp(filters.role, 'i') };
    }

    const sortOptions: any = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    return this.playerModel.find(query).sort(sortOptions).exec();
  }
}



