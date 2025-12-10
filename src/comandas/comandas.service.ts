import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateComandaDto } from './dto/create-comanda.dto';

@Injectable()
export class ComandasService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateComandaDto) {
    // 1. Obtener los productos para saber sus precios ACTUALES
    const productosIds = dto.detalles.map((d) => d.productoId);
    const productosDB = await this.prisma.producto.findMany({
      where: { id: { in: productosIds } },
    });

    // Validar que todos existan
    if (productosDB.length !== new Set(productosIds).size) {
      throw new NotFoundException('Uno o más productos no existen o están inactivos');
    }

    // 2. Preparar los detalles con el precio "congelado"
    let totalComanda = 0;
    
    const detallesData = dto.detalles.map((item) => {
      const producto = productosDB.find((p) => p.id === item.productoId);
      if (!producto) throw new NotFoundException(`Producto ${item.productoId} no encontrado`);

      const precioSnapshot = producto.precio; 
      totalComanda += precioSnapshot * item.cantidad;

      return {
        productoId: item.productoId,
        cantidad: item.cantidad,
        precioUnitario: precioSnapshot, // <--- CLAVE: Guardamos el precio histórico
        observacion: item.description,
      };
    });

    // 3. Crear la transacción (Cabecera + Detalles)
    return this.prisma.comanda.create({
      data: {
        mesaId: dto.mesaId,
        userId: userId, // El garzón (req.user.sub)
        estado: 'PENDIENTE',
        total: totalComanda,
        description: dto.description,
        detalles: {
          create: detallesData, // Prisma inserta los hijos automáticamente
        },
      },
      include: {
        mesa: true,
        detalles: {
          include: { producto: true },
        },
      },
    });
  }

  findAll() {
    return this.prisma.comanda.findMany({
      include: {
        mesa: true,
        user: { select: { name: true, email: true } }, // Mostrar quién la atendió
        detalles: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}