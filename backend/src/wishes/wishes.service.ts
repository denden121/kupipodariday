import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    const wish = this.wishesRepository.create({
      ...createWishDto,
      owner,
    });
    return this.wishesRepository.save(wish);
  }

  async findLast(): Promise<Wish[]> {
    return this.wishesRepository.find({
      relations: ['owner'],
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async findTop(): Promise<Wish[]> {
    return this.wishesRepository.find({
      relations: ['owner'],
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  async findById(id: number): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });
    if (!wish) {
      throw new NotFoundException('Желание не найдено');
    }
    return wish;
  }

  async updateById(
    id: number,
    updateWishDto: UpdateWishDto,
    userId: number,
  ): Promise<Wish> {
    const wish = await this.findById(id);

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете редактировать чужое желание');
    }

    if (updateWishDto.price !== undefined && wish.offers.length > 0) {
      throw new BadRequestException(
        'Нельзя изменить стоимость желания, на которое уже есть заявки',
      );
    }

    Object.assign(wish, updateWishDto);
    return this.wishesRepository.save(wish);
  }

  async deleteById(id: number, userId: number): Promise<Wish> {
    const wish = await this.findById(id);

    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете удалить чужое желание');
    }

    await this.wishesRepository.remove(wish);
    return wish;
  }

  async copyWish(id: number, user: User): Promise<Wish> {
    const originalWish = await this.findById(id);

    await this.wishesRepository.update(id, { copied: originalWish.copied + 1 });

    const newWish = this.wishesRepository.create({
      name: originalWish.name,
      link: originalWish.link,
      image: originalWish.image,
      price: originalWish.price,
      description: originalWish.description,
      owner: user,
    });

    return this.wishesRepository.save(newWish);
  }

  async updateRaised(id: number, raised: number): Promise<void> {
    await this.wishesRepository.update(id, { raised });
  }
}
