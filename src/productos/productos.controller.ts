import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { $Enums } from '@prisma/client';
import { CurrentUser } from '../auth/decorators/user.decorator';
type JwtUser = { sub: string; email: string };
@ApiTags('productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductosController {
    constructor(private readonly productosService: ProductosService) { }
    @Post() create(@CurrentUser() user: JwtUser, @Body() dto: CreateProductoDto) {
        return this.productosService.create(user.sub, dto);
    }
    @Get()
    findAll(
        @CurrentUser() user: any,
        @Query('skip') skip = '0',
        @Query('take') take = '20'
    ) {
        return this.productosService.findAll(user.sub, Number(skip), Number(take));
    }
    @Get(':id')
    findOne(@CurrentUser() user: JwtUser, @Param('id') id: string) {
        return this.productosService.findOne(user.sub, id);
    }
    @Patch(':id')
    update(
        @CurrentUser() user: JwtUser,
        @Param('id') id: string,
        @Body() dto: UpdateProductoDto
    ) {
        return this.productosService.update(user.sub, id, dto);
    }
    @Delete(':id')
    remove(@CurrentUser() user: JwtUser, @Param('id') id: string) {
        return this.productosService.remove(user.sub, id);
    }
    // Ejemplo de ruta SOLO ADMIN (requiere además RolesGuard + @Roles)
    @Get('admin/all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles($Enums.Role.ADMIN)
    findAllAsAdmin(
        @Query('skip') skip = '0',
        @Query('take') take = '20',
    ) {
        return this.productosService.findAllAdmin(Number(skip), Number(take));
    }
}