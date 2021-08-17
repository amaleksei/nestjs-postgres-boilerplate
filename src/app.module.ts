import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MulterModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => {
        return {
          storage: diskStorage({
            destination: async (req, file, cb) => {
              const path: string = configService.get('MULTER_DEST');
              console.log(path);
              return cb(null, path);
            },
            filename: (req, file, cb) => {
              return cb(null, `${Date.now()}_${file.originalname}`);
            }
          })
        }
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRESS_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
      models: [User,
        Role,
        UserRoles,
      ],
      autoLoadModels: true
    }),
    RolesModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [],
  providers: [FilesService],
})
export class AppModule {}
