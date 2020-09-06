import { IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;

  @ApiProperty()
  createdOn?: Date;
}
