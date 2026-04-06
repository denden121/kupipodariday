import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import type { User } from '../users/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    signin(user: User): {
        access_token: string;
    };
}
