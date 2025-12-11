import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMesaDto } from './dto/create-mesa.dto';

@Injectable()
export class MesasService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMesaDto) {
    // Validar duplicados (aunque Prisma lo hace, es mejor controlarlo aquí)
    const existe = await this.prisma.mesa.findUnique({
      where: { numeroMesa: dto.numeroMesa },
    });
    if (existe) throw new ConflictException(`La mesa ${dto.numeroMesa} ya existe`);

    return this.prisma.mesa.create({ data: dto });
  }

  async liberarMesa(id: string) {
  const mesa = await this.prisma.mesa.findUnique({ where: { id } });
  if (!mesa) throw new NotFoundException('Mesa no encontrada');

  // Buscar la última comanda pendiente o entregada de la mesa
  const ultimaComanda = await this.prisma.comanda.findFirst({
    where: {
      mesaId: id,
      estado: { in: ['PENDIENTE', 'EN_PREPARACION', 'ENTREGADO'] },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (ultimaComanda) {
    await this.prisma.comanda.update({
      where: { id: ultimaComanda.id },
      data: { estado: 'PAGADO' },
    });
  }

  // Liberar la mesa
  return this.prisma.mesa.update({
    where: { id },
    data: { usada: false },
  });
}

  findAll() {
    return this.prisma.mesa.findMany({
      orderBy: { numeroMesa: 'asc' }, // Ordenadas por número
    });
  }
}