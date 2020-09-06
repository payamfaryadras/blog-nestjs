import { IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class PostCreateDto {

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}
