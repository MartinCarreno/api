import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
@Injectable() export class ProductosService {
  constructor(private prisma: PrismaService) { }
  create(dto: CreateProductoDto) {
    const { dueDate, ...rest } = dto;
    return this.prisma.producto.create({
      data: { ...rest,  dueDate: dueDate ? new Date(dueDate) : null },
    });
  }
  findAll(skip = 0, take = 20) {
    return this.prisma.producto.findMany({
      where: { activo: true },
      orderBy: { createdAt: 'desc' },
      skip, take
    });
  }
  async findOne(id: string) {
    const producto = await this.prisma.producto.findFirst({ where: { id } });
    if (!producto) throw new NotFoundException('producto not found');
    return producto;
  }
  async update( id: string, dto: UpdateProductoDto) {
    await this.findOne( id);
    const { dueDate, ...rest } = dto;
    return this.prisma.producto.update({
      where: { id },
      data: { ...rest, ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}) },
    });
  }
  async remove( id: string) {
    await this.findOne( id);
    await this.prisma.producto.delete({ where: { id } });
    return { ok: true };
  }
  
}