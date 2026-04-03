import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким email или username уже существует',
      );
    }

    const hashedPassword = await this.hashService.hash(createUserDto.password);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  async findByUsernameWithPassword(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hash(
        updateUserDto.password,
      );
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existing = await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existing) {
        throw new ConflictException('Пользователь с таким username уже существует');
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existing = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existing) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
    }

    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async findMany(query: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.username ILIKE :query OR user.email ILIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }

  async getUserWishes(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['wishes', 'wishes.owner', 'wishes.offers'],
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user.wishes;
  }

  async getUserWishesByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['wishes', 'wishes.owner', 'wishes.offers'],
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user.wishes;
  }
}
