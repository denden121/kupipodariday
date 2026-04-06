import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';
export declare class WishesController {
    private readonly wishesService;
    private readonly usersService;
    constructor(wishesService: WishesService, usersService: UsersService);
    getLast(): Promise<import("./entities/wish.entity").Wish[]>;
    getTop(): Promise<import("./entities/wish.entity").Wish[]>;
    create(createWishDto: CreateWishDto, authUser: JwtPayload): Promise<import("./entities/wish.entity").Wish>;
    findOne(id: number): Promise<import("./entities/wish.entity").Wish>;
    update(id: number, updateWishDto: UpdateWishDto, authUser: JwtPayload): Promise<import("./entities/wish.entity").Wish>;
    remove(id: number, authUser: JwtPayload): Promise<import("./entities/wish.entity").Wish>;
    copy(id: number, authUser: JwtPayload): Promise<import("./entities/wish.entity").Wish>;
}
