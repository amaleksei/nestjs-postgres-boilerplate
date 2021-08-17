import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString } from "class-validator";

export class AuthUserDto {
    @ApiProperty({example: 'ivanov@example.com', description: 'Почта'})
    @IsString({message: 'Должен быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: '1Q-a', description: 'Пароль'})
    @IsString({message: 'Должен быть строкой'})
    // @Length(4, 16, {message: 'Не должно быть меньше 4 и не больше 16'})
    readonly password: string;
}
