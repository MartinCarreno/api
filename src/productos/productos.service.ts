import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
@Injectable() export class ProductosService {
  constructor(private prisma: PrismaService) { }
  create(userId: string, dto: CreateProductoDto) {
    const { dueDate, ...rest } = dto;
    return this.prisma.producto.create({
      data: { ...rest, userId, dueDate: dueDate ? new Date(dueDate) : null },
    });
  }
  findAll(userId: string, skip = 0, take = 20) {
    return this.prisma.producto.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip, take
    });
  }
  async findOne(userId: string, id: string) {
    const producto = await this.prisma.producto.findFirst({ where: { id, userId } });
    if (!producto) throw new NotFoundException('producto not found');
    return producto;
  }
  async update(userId: string, id: string, dto: UpdateProductoDto) {
    await this.findOne(userId, id);
    const { dueDate, ...rest } = dto;
    return this.prisma.producto.update({
      where: { id },
      data: { ...rest, ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}) },
    });
  }
  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    await this.prisma.producto.delete({ where: { id } });
    return { ok: true };
  }
  // Lista TODAS las tareas (uso ADMIN)
  findAllAdmin(skip = 0, take = 20) {
    return this.prisma.producto.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }
}