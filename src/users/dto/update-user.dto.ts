import { ApiProperty } from "@nestjs/swagger";
import {IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @IsOptional()
    @IsString({message: 'Должен быть строкой'})
    readonly login?: string;

    @ApiProperty({example: 'ivanov@example.com', description: 'Почта'})
    @IsOptional()
    @IsString({message: 'Должен быть строкой'})
    readonly email?: string;

    @ApiProperty({example: '1Q-a', description: 'Пароль'})
    @IsString({message: 'Должен быть строкой'})
    @Length(4, 16, {message: 'Не должно быть меньше 4 и не больше 16'})
    readonly password: string;

    @ApiProperty({example: 'true', description: 'Заблокирован пользователь или нет'})
    @IsOptional()
    @IsBoolean({message: 'Должен быть булевым значением'})
    readonly is_locked?: boolean;
}
