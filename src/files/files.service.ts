import {HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';
// import * as uuid from 'uuid';
import {CreateFileEmployeDto} from "./dto/create-file-employe.dto";
// import { createReadStream } from 'fs';
// import { join } from 'path';


@Injectable()
export class FilesService {
    async createFile(file: Express.Multer.File, dto: CreateFileEmployeDto): Promise<string> {
        try {
            // const fileName = `${uuid.v4()}.xlsx`;
            const fileExtension: string = path.extname(file.originalname);
            const fileName:string = `${dto.filename}${fileExtension}`;
            const filePath = path.resolve(__dirname, '..', 'static')
            const employeId = dto.employe_id;
            const employePath = path.resolve(filePath, employeId)

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }

            if (!fs.existsSync(employePath)) {
                fs.mkdirSync(employePath, {recursive: true})
            }

            await fs.writeFileSync(path.join(employePath, fileName), file.buffer)
            return JSON.stringify({fileName, body: dto});
        }
        catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // async getFile(@Res() res: Response) {
    //     const file = createReadStream(join(process.cwd(), 'package.json'));
    //     file.pipe(res);
    // }
}
