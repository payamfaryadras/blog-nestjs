import { Post } from './post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/user.entity';
import {ApiProperty} from "@nestjs/swagger";

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid') id: string;
  @ApiProperty()
  @Column({ type: 'text', nullable: true }) description?: string;
  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;

  @ManyToOne(type => User)
  owner?: User;

  @ManyToOne(type => Post, post => post.comments)
  post?: Post;
}
