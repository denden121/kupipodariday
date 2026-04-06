import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UsersService } from '../users/users.service';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';
export declare class OffersController {
    private readonly offersService;
    private readonly usersService;
    constructor(offersService: OffersService, usersService: UsersService);
    findAll(): Promise<import("./entities/offer.entity").Offer[]>;
    create(createOfferDto: CreateOfferDto, authUser: JwtPayload): Promise<import("./entities/offer.entity").Offer>;
    findOne(id: number): Promise<import("./entities/offer.entity").Offer>;
}
