import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from 'src/roles/user-roles.model';
import {Role} from '../roles/roles.model';

interface UserCreationAttrs {
    login: string;
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ivanovii', description: 'Уникальный логин'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: 'ivanov@example.com', description: 'Уникальный email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '1Q-a', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Заблокирован пользователь или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_locked: boolean;

    @ApiProperty({example: '10', description: 'Общее количество посещений'})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    count_visit: number;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];
}
