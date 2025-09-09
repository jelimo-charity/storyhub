
import { UserRole } from '../models/users.model';

export class UpdateUserDto {
	username?: string;
	email?: string;
	password?: string;
	role?: UserRole;
	bio?: string;
	profilePicture?: string;
}
