import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @ApiProperty() @IsEmail()
    email!: string;

    @ApiProperty() @IsString()
    @MinLength(6)
    password!: string;

    @ApiProperty() @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty() @IsString()
    @IsOptional()
    role?: "USER";
}