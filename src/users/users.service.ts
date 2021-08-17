import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { getMessage, record } from 'src/utils/message';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './users.model';
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {LockUserDto} from "./dto/lock-user.dto";
import {CreateManyUsersDto} from "./dto/create-many-users.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User, private rolesService: RolesService, private jwtService: JwtService) {}

    async getAll() {
        // let usersTotal = 0;
        // let message = '';
        let result;

        const users = await this.userRepository.findAll({include: {all: true}});
        const usersTotal = users.length;
        result = {
            message: getMessage('Получено', usersTotal, record),
            total: usersTotal,
            data: users,
        }
        return result;
    }

    async findById(id: number) {
        return await this.userRepository.findOne({where: { id }, include: {all: true}});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: { email }, include: {all: true}});
    }

    async generateToken(user: User){
        const payload = {email: user.email, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async create(userDto: CreateUserDto) {
        const candidate = await this.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userRepository.create({...userDto, password: hashPassword});
        // 'ToDo Добавить автоматический выбор роли при создании пользователя.
        const role = await this.rolesService.getRoleByValue("ADMIN");
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return this.generateToken(user);
    }

    async createMany(userDto: CreateManyUsersDto) {
        try {
            let users = [];
            // console.log('userDto.users', userDto);
            const usersArray = userDto.users;
            const length = usersArray && usersArray.length;
            new Promise( (resolve) => {
                usersArray && usersArray.map(async (userItem) => {
                    const createdUser = await this.userRepository.create(userItem)
                    const role = await this.rolesService.getRoleByValue("USER");
                    createdUser.$set('roles', [role.id]);
                    createdUser.roles = [role];
                    resolve(createdUser)
                })
            })

            if (length > 0) {
                return {
                    message: `Создано ${length} записей`,
                    total: length,
                    data: users,
                }
            }
            return {
                message: `Создано 0 записей. Отправлено пользователей 0`,
                total: 0,
                data: users,
            }
        }
        catch (e) {
            return {
                message: `Ошибка при создании пользователей: ${e}`,
                total: 0,
                data: [],
            }
        }
    }

    async update(updateUserDto: UpdateUserDto, id: number ) {
        return this.userRepository.update(updateUserDto, {where: { id }});
    }

    async remove(id: number) {
        return this.userRepository.destroy({where: { id }});
    }

    async addRole(dto: AddRoleDto){
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async lock(dto: LockUserDto){
        const user = await  this.userRepository.findByPk(dto.userId);

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.is_locked = true;
        await user.save();
        return user;
    }
}
