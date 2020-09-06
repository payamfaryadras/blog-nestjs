import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  mobile: string;
}
