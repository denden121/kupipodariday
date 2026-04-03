import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find();
  }

  async create(
    createWishlistDto: CreateWishlistDto,
    owner: User,
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = createWishlistDto;

    let items: Wish[] = [];
    if (itemsId && itemsId.length > 0) {
      items = await this.wishesRepository.findBy({ id: In(itemsId) });
    }

    const wishlist = this.wishlistsRepository.create({
      ...rest,
      owner,
      items,
    });

    return this.wishlistsRepository.save(wishlist);
  }

  async findById(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistsRepository.findOne({ where: { id } });
    if (!wishlist) {
      throw new NotFoundException('Список желаний не найден');
    }
    return wishlist;
  }

  async updateById(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ): Promise<Wishlist> {
    const wishlist = await this.findById(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете редактировать чужой список желаний',
      );
    }

    const { itemsId, ...rest } = updateWishlistDto;

    if (itemsId !== undefined) {
      let items: Wish[] = [];
      if (itemsId.length > 0) {
        items = await this.wishesRepository.findBy({ id: In(itemsId) });
      }
      wishlist.items = items;
    }

    Object.assign(wishlist, rest);
    return this.wishlistsRepository.save(wishlist);
  }

  async deleteById(id: number, userId: number): Promise<Wishlist> {
    const wishlist = await this.findById(id);

    if (wishlist.owner.id !== userId) {
      throw new ForbiddenException(
        'Вы не можете удалить чужой список желаний',
      );
    }

    await this.wishlistsRepository.remove(wishlist);
    return wishlist;
  }
}
