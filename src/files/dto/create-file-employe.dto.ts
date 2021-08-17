import { Type } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

export class CreateFileEmployeDto {
    @IsString()
    @Type(() => String)
    readonly employe_id: string;

    @IsUUID('4')
    readonly filename: string;
}
