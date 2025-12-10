import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { ProductosModule } from './productos/productos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MesasModule } from './mesas/mesas.module';
import { ComandasModule } from './comandas/comandas.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <-- añade esto (carga apps/api/.env)
    PrismaModule,
    ProductosModule,
    UsersModule,
    AuthModule,
    MesasModule,
    ComandasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
