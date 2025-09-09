import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

		async validateUser(email: string, password: string) {
			const user = await this.usersService.findByEmail(email);
			if (!user || !user.password) {
				return null;
			}
			if (await bcrypt.compare(password, user.password)) {
				// Don't return password
				const { password, ...result } = user['dataValues'] || user;
				return result;
			}
			return null;
	}

	async login(loginDto: LoginDto) {
		const user = await this.validateUser(loginDto.email, loginDto.password);
		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}
		const payload = { sub: user.id, username: user.username, email: user.email, role: user.role };
		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
