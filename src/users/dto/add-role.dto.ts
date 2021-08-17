import {IsInt, IsString } from "class-validator";

export class AddRoleDto {
    @IsString({message: 'Должен быть строкой'})
    readonly value: string;

    @IsInt({message: 'Должен быть целым числом'})
    readonly userId: number;
}
