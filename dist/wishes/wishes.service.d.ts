import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from '../users/entities/user.entity';
export declare class WishesService {
    private readonly wishesRepository;
    constructor(wishesRepository: Repository<Wish>);
    create(createWishDto: CreateWishDto, owner: User): Promise<Wish>;
    findLast(): Promise<Wish[]>;
    findTop(): Promise<Wish[]>;
    findById(id: number): Promise<Wish>;
    updateById(id: number, updateWishDto: UpdateWishDto, userId: number): Promise<Wish>;
    deleteById(id: number, userId: number): Promise<Wish>;
    copyWish(id: number, user: User): Promise<Wish>;
    updateRaised(id: number, raised: number): Promise<void>;
}
