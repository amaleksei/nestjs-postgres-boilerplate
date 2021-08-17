import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Role} from "./roles.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: 'Создание роли'})
  @ApiResponse({status: 201, type: Role})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({summary: 'Получение роли по его значению'})
  @ApiResponse({status: 200, type: Role})
  @UseGuards(JwtAuthGuard)
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
