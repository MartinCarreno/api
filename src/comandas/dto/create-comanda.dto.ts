import { IsString, IsInt, IsArray, ValidateNested, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ComandaDetalleDto {
  @ApiProperty()
  @IsString()
  productoId: string;

  @ApiProperty({ default: 1 })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateComandaDto {
  @ApiProperty()
  @IsString()
  mesaId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string; // Observación general de la mesa (ej: "Mesa VIP")

  @ApiProperty({ type: [ComandaDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ComandaDetalleDto)
  detalles: ComandaDetalleDto[];
}