import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto{
    @ApiProperty({example: 'ADMIN', description: 'Администратор'})
    @IsString({message: 'Должен быть строкой'})
    readonly value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @IsString({message: 'Должен быть строкой'})
    readonly description: string;
}
