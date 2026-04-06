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
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
const wish_entity_1 = require("../wishes/entities/wish.entity");
let WishlistsService = class WishlistsService {
    wishlistsRepository;
    wishesRepository;
    constructor(wishlistsRepository, wishesRepository) {
        this.wishlistsRepository = wishlistsRepository;
        this.wishesRepository = wishesRepository;
    }
    async findAll() {
        return this.wishlistsRepository.find();
    }
    async create(createWishlistDto, owner) {
        const { itemsId, ...rest } = createWishlistDto;
        let items = [];
        if (itemsId && itemsId.length > 0) {
            items = await this.wishesRepository.findBy({ id: (0, typeorm_2.In)(itemsId) });
        }
        const wishlist = this.wishlistsRepository.create({
            ...rest,
            owner,
            items,
        });
        return this.wishlistsRepository.save(wishlist);
    }
    async findById(id) {
        const wishlist = await this.wishlistsRepository.findOne({ where: { id } });
        if (!wishlist) {
            throw new common_1.NotFoundException('Список желаний не найден');
        }
        return wishlist;
    }
    async updateById(id, updateWishlistDto, userId) {
        const wishlist = await this.findById(id);
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете редактировать чужой список желаний');
        }
        const { itemsId, ...rest } = updateWishlistDto;
        if (itemsId !== undefined) {
            let items = [];
            if (itemsId.length > 0) {
                items = await this.wishesRepository.findBy({ id: (0, typeorm_2.In)(itemsId) });
            }
            wishlist.items = items;
        }
        Object.assign(wishlist, rest);
        return this.wishlistsRepository.save(wishlist);
    }
    async deleteById(id, userId) {
        const wishlist = await this.findById(id);
        if (wishlist.owner.id !== userId) {
            throw new common_1.ForbiddenException('Вы не можете удалить чужой список желаний');
        }
        await this.wishlistsRepository.remove(wishlist);
        return wishlist;
    }
};
exports.WishlistsService = WishlistsService;
exports.WishlistsService = WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __param(1, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistsService);
//# sourceMappingURL=wishlists.service.js.map