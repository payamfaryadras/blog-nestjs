import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/user.create.dto';
import {RegistrationStatus} from './interfaces/regisration-status.interface';
import {UsersService} from '../users/users.service';
import {LoginStatus} from './interfaces/login-status.interface';
import {LoginUserDto} from '../users/dto/user-login.dto';
import {UserDto} from '../users/dto/user.dto';
import {JwtService} from '@nestjs/jwt';
import { sha512 } from 'hash.js';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        const hashedPassword =  sha512().update(userDto.password).digest('hex');
        try {
            await this.usersService.create({
                mobile: userDto.mobile,
                password: hashedPassword,
                username: userDto.username
            });
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        const user = await this.usersService.findByLogin(loginUserDto);

        const token = this._createToken(user.username);

        return {
            username: user.username,
            ...token,
        };
    }

    async validateUser(username: string): Promise<UserDto> {
        console.log("hhhhhhhhhhhhhhh"+username);
        const user = await this.usersService.findByPayload(username);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private _createToken(username:string): any {
        const accessToken = this.jwtService.sign({username:username});
        return {
            expiresIn: 3600 * 24,
            accessToken,
        };
    }
}
