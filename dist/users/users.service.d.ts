import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '../hash/hash.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly hashService;
    constructor(usersRepository: Repository<User>, hashService: HashService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User>;
    findByUsernameWithPassword(username: string): Promise<User | null>;
    updateById(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findMany(query: string): Promise<User[]>;
    getUserWishes(userId: number): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    getUserWishesByUsername(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
}
