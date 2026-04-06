import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from '../users/entities/user.entity';
import { WishesService } from '../wishes/wishes.service';
export declare class OffersService {
    private readonly offersRepository;
    private readonly wishesService;
    constructor(offersRepository: Repository<Offer>, wishesService: WishesService);
    create(createOfferDto: CreateOfferDto, user: User): Promise<Offer>;
    findAll(): Promise<Offer[]>;
    findById(id: number): Promise<Offer>;
}
