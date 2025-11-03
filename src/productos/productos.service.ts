import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, userId: string) {
    return (this.prisma as any).producto.create({
      data: {
        ...data,
        userId
      }
    });
  }

  // ahora acepta userId y paginado
  async findAll(userId: string, skip = 0, take = 20) {
    return (this.prisma as any).producto.findMany({
      where: { userId },
      skip,
      take,
    });
  }

  async findOne(id: string, userId: string) {
    const producto = await (this.prisma as any).producto.findFirst({
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

  async update(id: string, data: any, userId: string) {
    // valida pertenencia
    await this.findOne(id, userId);
    return (this.prisma as any).producto.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return (this.prisma as any).producto.delete({ where: { id } });
  }
}
