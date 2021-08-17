import { Controller, Post, Body } from '@nestjs/common';
import {ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {CreateUserDto} from "../users/dto/create-user.dto";
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @Post('/login')
    login(@Body() userDto: AuthUserDto) {
      return this.authService.login(userDto);
    }

    @ApiOperation({summary: 'Регистрация пользователя'})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
      return this.authService.registration(userDto);
    }
  }

