import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Post} from "../blog/entities/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    mobile: string;

    @OneToMany(type => Post, post => post.user)
    posts?: Post[];
}
