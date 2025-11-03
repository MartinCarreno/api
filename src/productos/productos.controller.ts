import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

type JwtUser = { sub: string; email: string };
@ApiTags('productos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // <-- proteger todas las rutas del controlador
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() dto: CreateProductoDto, @CurrentUser() user: { sub: string }) {
    return this.productosService.create(dto, user.sub);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtUser,
    @Query('skip') skip = '0',
    @Query('take') take = '20',
  ) {
    return this.productosService.findAll(user.sub, Number(skip), Number(take));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: { sub: string }) {
    return this.productosService.findOne(id, user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductoDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.productosService.update(id, dto, user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.productosService.remove(id, user.sub);
  }
}
