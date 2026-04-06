import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';
export declare class WishlistsController {
    private readonly wishlistsService;
    private readonly usersService;
    constructor(wishlistsService: WishlistsService, usersService: UsersService);
    findAll(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    create(createWishlistDto: CreateWishlistDto, authUser: JwtPayload): Promise<import("./entities/wishlist.entity").Wishlist>;
    findOne(id: number): Promise<import("./entities/wishlist.entity").Wishlist>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, authUser: JwtPayload): Promise<import("./entities/wishlist.entity").Wishlist>;
    remove(id: number, authUser: JwtPayload): Promise<import("./entities/wishlist.entity").Wishlist>;
}
