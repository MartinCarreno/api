import { Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    // declare inherited methods so TypeScript recognizes them on this class
    $connect: () => Promise<void>;
    $disconnect: () => Promise<void>;

    async onModuleInit() {
       await this.$connect(); 
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}