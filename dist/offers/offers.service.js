"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const wishes_service_1 = require("../wishes/wishes.service");
let OffersService = class OffersService {
    offersRepository;
    wishesService;
    constructor(offersRepository, wishesService) {
        this.offersRepository = offersRepository;
        this.wishesService = wishesService;
    }
    async create(createOfferDto, user) {
        const wish = await this.wishesService.findById(createOfferDto.itemId);
        if (wish.owner.id === user.id) {
            throw new common_1.ForbiddenException('Вы не можете скидываться на собственное желание');
        }
        const available = Number(wish.price) - Number(wish.raised);
        if (createOfferDto.amount > available) {
            throw new common_1.BadRequestException('Сумма взноса превышает оставшуюся стоимость подарка');
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
    async findAll() {
        return this.offersRepository.find({
            relations: ['user', 'item'],
        });
    }
    async findById(id) {
        const offer = await this.offersRepository.findOne({
            where: { id },
            relations: ['user', 'item'],
        });
        if (!offer) {
            throw new common_1.NotFoundException('Заявка не найдена');
        }
        return offer;
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService])
], OffersService);
//# sourceMappingURL=offers.service.js.map