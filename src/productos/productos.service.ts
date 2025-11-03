import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductoDto, userId: string) {
    const { dueDate, ...rest } = dto;
    return this.prisma.producto.create({
      data: { ...rest, userId, dueDate: dueDate ? new Date(dueDate) : null },
    });
  }

  // ahora acepta userId y paginado
  async findAll(userId: string, skip = 0, take = 20) {
    return this.prisma.producto.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip, take,
    });
  }

  async findOne(id: string, userId: string) {
    const producto = await this.prisma.producto.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!producto) {
      throw new NotFoundException('Producto not found or access denied');
    }

    return producto;
  }

  async update(id: string, dto: UpdateProductoDto, userId: string) {
    // valida pertenencia
    await this.findOne(id, userId);
    const { dueDate, ...rest } = dto;
    return (this.prisma as any).producto.update({
      where: { id },
      data: { ...rest, ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}) },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.prisma.producto.delete({ where: { id } });
    return { ok: true };
  }
}
