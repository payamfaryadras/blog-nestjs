import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity'
import { AuthModule } from 'src/auth/auth.module';
import {BlogController} from "./blog.controller";
import {Post} from "./entities/post.entity";
import {Comment} from "./entities/comment.entity";
import {BlogService} from "./blog.service";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        User,
        AuthModule,
        TypeOrmModule.forFeature([Post, Comment]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
