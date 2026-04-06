import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const wish = await this.wishesService.findById(createOfferDto.itemId);

    if (wish.owner.id === user.id) {
      throw new ForbiddenException(
        'Вы не можете скидываться на собственное желание',
      );
    }

    const available = Number(wish.price) - Number(wish.raised);
    if (createOfferDto.amount > available) {
      throw new BadRequestException(
        'Сумма взноса превышает оставшуюся стоимость подарка',
      );
    }

    const offer = this.offersRepository.create({
      ...createOfferDto,
      user,
      item: wish,
    });

    const savedOffer = await this.offersRepository.save(offer);

    const allOffers = await this.offersRepository.find({
      where: { item: { id: wish.id } },
    });
    const totalRaised = allOffers.reduce((sum, o) => sum + Number(o.amount), 0);
    await this.wishesService.updateRaised(wish.id, totalRaised);

    return savedOffer;
  }

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find({
      relations: ['user', 'item'],
    });
  }

  async findById(id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    });
    if (!offer) {
      throw new NotFoundException('Заявка не найдена');
    }
    return offer;
  }
}
