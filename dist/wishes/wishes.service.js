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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
let WishesService = class WishesService {
    wishesRepository;
    constructor(wishesRepository) {
        this.wishesRepository = wishesRepository;
    }
    async create(createWishDto, owner) {
        const wish = this.wishesRepository.create({
            ...createWishDto,
            owner,
        });
        return this.wishesRepository.save(wish);
    }
    async findLast() {
        return this.wishesRepository.find({
            relations: ['owner'],
            order: { createdAt: 'DESC' },
            take: 40,
        });
    }
    async findTop() {
        return this.wishesRepository.find({
            relations: ['owner'],
            order: { copied: 'DESC' },
            take: 20,
        });
    }
    async findById(id) {
        const wish = await this.wishesRepository.findOne({
            where: { id },
            relations: ['owner', 'offers', 'offers.user'],
        });
        if (!wish) {
            throw new common_1.NotFoundException('Желание не найдено');
        }
        return wish;
    }
    async updateById(id, updateWishDto, userId) {
        const wish = await this.findById(id);
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете редактировать чужое желание');
        }
        if (updateWishDto.price !== undefined && wish.offers.length > 0) {
            throw new common_1.BadRequestException('Нельзя изменить стоимость желания, на которое уже есть заявки');
        }
        Object.assign(wish, updateWishDto);
        return this.wishesRepository.save(wish);
    }
    async deleteById(id, userId) {
        const wish = await this.findById(id);
        if (wish.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалить чужое желание');
        }
        await this.wishesRepository.remove(wish);
        return wish;
    }
    async copyWish(id, user) {
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
    async updateRaised(id, raised) {
        await this.wishesRepository.update(id, { raised });
    }
};
exports.WishesService = WishesService;
exports.WishesService = WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
//# sourceMappingURL=wishes.service.js.map