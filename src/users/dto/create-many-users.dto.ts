import { CreateUserDto } from "./create-user.dto";
import { IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManyUsersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CreateUserDto)
    users: [CreateUserDto]
}
