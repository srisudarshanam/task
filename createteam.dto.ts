import { IsNotEmpty,IsNumber,IsOptional,IsString } from 'class-validator';

export class createteamDto{
    @IsNotEmpty()
    @IsString()
    name: string;

     @IsNotEmpty()
     @IsString()
     sport: string;
      
     @IsNotEmpty()
     @IsString()
     coach: string;

     @IsNumber()
     @IsOptional()
     count?: number;

     @IsString()
     @IsOptional()
     country?: string;

}