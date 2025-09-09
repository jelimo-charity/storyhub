import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    // Required fields
    if (!username || !email || !password) {
      throw new Error('Missing required user fields');
    }
  // Optional fields with defaults
  const role: UserRole = createUserDto.role ?? UserRole.READER;
    const bio = createUserDto.bio ?? '';
    const profilePicture = createUserDto.profilePicture ?? '';
    return this.userModel.create({
      username: username!,
      email: email!,
      password: password!,
      role,
      bio,
      profilePicture
    } as any);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
