import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Post('register')
	async register(@Body() createUserDto: CreateUserDto) {
		const user = await this.usersService.create(createUserDto);
		// Optionally, auto-login after registration:
		// return this.authService.login({ email: user.email, password: createUserDto.password });
		return { message: 'User registered successfully', user };
	}
}
