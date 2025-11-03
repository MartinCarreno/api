import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(email: string, password: string, nombre?: string) {
        // Verificar email duplicado
        const exists = await this.prisma.user.findUnique({where: {email}});
        if (exists) {
            throw new ConflictException('Email already exists');
        }

        // Hash contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Crear usuario
        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
                nombre
            }
        });       
    }

    // Método requerido por la rúbrica
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {email}
        });
    }

    // Método requerido por la rúbrica
    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: {id}
        });
    }
}