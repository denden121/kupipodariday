import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
export declare class WishlistsService {
    private readonly wishlistsRepository;
    private readonly wishesRepository;
    constructor(wishlistsRepository: Repository<Wishlist>, wishesRepository: Repository<Wish>);
    findAll(): Promise<Wishlist[]>;
    create(createWishlistDto: CreateWishlistDto, owner: User): Promise<Wishlist>;
    findById(id: number): Promise<Wishlist>;
    updateById(id: number, updateWishlistDto: UpdateWishlistDto, userId: number): Promise<Wishlist>;
    deleteById(id: number, userId: number): Promise<Wishlist>;
}
