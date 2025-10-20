import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { CurrentUser } from './user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.auth.signup(dto.email, dto.password, dto.nombre);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return user; // { sub, email }
  }
}
