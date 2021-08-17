import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {LockUserDto} from "./dto/lock-user.dto";
import {ValidationExceptionFilter} from "../filters/validation-exception.filter";
import {CreateManyUsersDto} from "./dto/create-many-users.dto";

@ApiTags('Пользователи')
@Controller('users')
@UseFilters(new ValidationExceptionFilter())
export class UsersController {

  constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Получение списка всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
      return this.usersService.getAll();
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 201, type: User})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @ApiOperation({summary: 'Создание пользователей пакетно'})
    @ApiResponse({status: 201, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('multiple')
    createMany(@Body() createUserDto: CreateManyUsersDto) {
      return this.usersService.createMany(createUserDto);
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.usersService.remove(id)
    }

    @ApiOperation({summary: 'Получение пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Get(':id')
    getById(@Param('id') id: number) {
      return this.usersService.findById(id)
}

    @ApiOperation({summary: 'Обновление пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @Roles("USER")
    @UseGuards(RolesGuard)
    @Put(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: number) {
    return this.usersService.update(updateUserDto, id)
    }

    @ApiOperation({summary: 'Добавление роли'})
    @ApiResponse({status: 200})
    // @UseGuards(JwtAuthGuard)
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
      return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Заблокировать пользователя'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/lock')
    lock(@Body() dto: LockUserDto) {
      return this.usersService.lock(dto);
    }
}
