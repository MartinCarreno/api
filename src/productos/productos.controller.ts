import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

type JwtUser = { sub: string; email: string };
@ApiTags('productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }
    @Post() @Roles(Role.ADMIN) create( @Body() dto: CreateProductoDto) {
        return this.productosService.create( dto);
    }
    @Get()
    findAll(
        @Query('skip') skip = '0',
        @Query('take') take = '20'
    ) {
        return this.productosService.findAll( Number(skip), Number(take));
    }
    @Get(':id')
    findOne( @Param('id') id: string) {
        return this.productosService.findOne( id);
    }
    @Patch(':id') @Roles(Role.ADMIN)
    update( 
        @Param('id') id: string,
        @Body() dto: UpdateProductoDto
    ) {
        return this.productosService.update(id, dto);
    }
    @Delete(':id') @Roles(Role.ADMIN)
    remove( @Param('id') id: string) {
        return this.productosService.remove(id);
    }
    
}