import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) { }
    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        return this.auth.signup(dto.email, dto.password, dto.name);
    }
    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto.email, dto.password);
    }
    @Post('refresh')
    refresh(@Body() dto: RefreshTokenDto) { 
        // Pasamos el valor específico al servicio
        return this.auth.refresh(dto.refresh_token); 
    }

    @Post('logout')
    logout(@Body() dto: RefreshTokenDto) { 
        // Pasamos el valor específico al servicio
        return this.auth.logout(dto.refresh_token); 
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@CurrentUser() user: any) {
        return user; // { sub, email }
    }
}