import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PostDto {

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    id: string;
}
