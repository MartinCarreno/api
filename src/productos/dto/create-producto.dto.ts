import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoValues } from './tipo';
import type {Tipo} from './tipo';

export class CreateProductoDto {
    @ApiProperty() @IsString() @IsNotEmpty() nombre!: string;
    @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
    @ApiProperty({ enum: TipoValues, default: 'COMESTIBLE' })
    @IsOptional()
    @IsEnum(TipoValues)
    tipo?: Tipo = 'COMESTIBLE';
    @ApiProperty({ required: false }) @IsOptional() @IsDateString() dueDate?:string;

}
