import { UserRole } from '../models/users.model';

export class CreateUserDto {
	username: string;
	email: string;
	password: string;
	role?: UserRole;
	bio?: string;
	profilePicture?: string;
}
