import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly hashService;
    private readonly jwtService;
    constructor(usersService: UsersService, hashService: HashService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(user: User): {
        access_token: string;
    };
    register(createUserDto: CreateUserDto): Promise<User>;
}
