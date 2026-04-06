import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: JwtPayload): Promise<import("./entities/user.entity").User>;
    updateMe(user: JwtPayload, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    getMyWishes(user: JwtPayload): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    getUserByUsername(username: string): Promise<import("./entities/user.entity").User>;
    getUserWishes(username: string): Promise<import("../wishes/entities/wish.entity").Wish[]>;
    findUsers(query: string): Promise<import("./entities/user.entity").User[]>;
}
