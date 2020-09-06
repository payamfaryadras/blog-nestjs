import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import {UserDto} from "./dto/user.dto";
import {toUserDto} from "../shared/mapper";
import {LoginUserDto} from "./dto/user-login.dto";
import {comparePasswords} from "../shared/utils";
import {CreateUserDto} from "./dto/user.create.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepo.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({ where: { username } });
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, mobile } = userDto;

        // check if the user exists in the db
        const userInDb = await this.userRepo.findOne({ where: { username } });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepo.create({
            username,
            password,
            mobile,
        });

        await this.userRepo.save(user);

        return toUserDto(user);
    }

    private _sanitizeUser(user: User) {
        delete user.password;
        return user;
    }
}

