import { Injectable, ConflictException } from '@nestjs/common';
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

  findAll() {
    return this.prisma.mesa.findMany({
      orderBy: { numeroMesa: 'asc' }, // Ordenadas por número
    });
  }
}