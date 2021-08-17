import {Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {User} from "../users/users.model";
import * as bcrypt from 'bcryptjs';
import {AuthUserDto} from "../users/dto/auth-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async login(userDto: AuthUserDto) {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user)
        return {
            username: user?.login,
            ...token
        };
    }

    async registration(userDto: CreateUserDto) {
        // const candidate = await this.usersService.getUserByEmail(userDto.email);
        // if (candidate) {
        //     throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        // }
        // const hashPassword = await bcrypt.hash(userDto.password, 5);
        // const user = await this.usersService.create({...userDto, password: hashPassword});
        // return this.generateToken(user);
        return await this.usersService.create(userDto);
    }

    async generateToken(user: User){
        const payload = {email: user.email, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: AuthUserDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        // console.log('user', user);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        // console.log('passwordEquals', passwordEquals);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
