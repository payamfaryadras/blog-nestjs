import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Comment} from './comment.entity';
import {User} from "../../users/user.entity";

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({type: 'varchar',length:500, nullable: false}) description: string;
    @Column({type: 'varchar',length:200, nullable: true}) photoUrl: string;
    @CreateDateColumn() createdOn?: Date;
    @OneToMany(type => Comment, comment => comment.post)
    comments?: Comment[];
    @ManyToOne(type => User, user => user.posts)
    user?: User;
}
