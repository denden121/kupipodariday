"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const wishes_module_1 = require("./wishes/wishes.module");
const wishlists_module_1 = require("./wishlists/wishlists.module");
const offers_module_1 = require("./offers/offers.module");
const hash_module_1 = require("./hash/hash.module");
const user_entity_1 = require("./users/entities/user.entity");
const wish_entity_1 = require("./wishes/entities/wish.entity");
const wishlist_entity_1 = require("./wishlists/entities/wishlist.entity");
const offer_entity_1 = require("./offers/entities/offer.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST || 'localhost',
                port: parseInt(process.env.DATABASE_PORT || '5432', 10),
                username: process.env.DATABASE_USERNAME || 'student',
                password: process.env.DATABASE_PASSWORD || 'student',
                database: process.env.DATABASE_NAME || 'kupipodariday',
                entities: [user_entity_1.User, wish_entity_1.Wish, wishlist_entity_1.Wishlist, offer_entity_1.Offer],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            wishes_module_1.WishesModule,
            wishlists_module_1.WishlistsModule,
            offers_module_1.OffersModule,
            hash_module_1.HashModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map