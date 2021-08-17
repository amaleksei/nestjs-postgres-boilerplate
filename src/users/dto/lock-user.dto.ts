import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class LockUserDto {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @IsInt({message: 'Должен быть целым числом'})
    readonly userId: number;
}
