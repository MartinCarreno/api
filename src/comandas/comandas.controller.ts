import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ComandasService } from './comandas.service';
import { CreateComandaDto } from './dto/create-comanda.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Comandas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('comandas')
export class ComandasController {
  constructor(private readonly comandasService: ComandasService) {}

  // Crear Comanda: Accesible para USER (Garzón) y ADMIN
  @Post()
  @Roles(Role.USER, Role.ADMIN)
  create(@Request() req, @Body() createComandaDto: CreateComandaDto) {
    // AQUÍ USAMOS TU ESTRUCTURA: req.user.sub es el ID
    const userId = req.user.sub; 
    return this.comandasService.create(userId, createComandaDto);
  }

  // Ver todas las comandas (Cocina, Caja, Admin)
  @Get()
  findAll() {
    return this.comandasService.findAll();
  }
}