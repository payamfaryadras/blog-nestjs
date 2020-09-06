import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersService } from './users.service';
import {User} from "./user.entity";
import {Post} from "../blog/entities/post.entity";

@Module({
  imports: [Post,TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
