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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const hash_service_1 = require("../hash/hash.service");
let UsersService = class UsersService {
    usersRepository;
    hashService;
    constructor(usersRepository, hashService) {
        this.usersRepository = usersRepository;
        this.hashService = hashService;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: [
                { username: createUserDto.username },
                { email: createUserDto.email },
            ],
        });
        if (existingUser) {
            throw new common_1.ConflictException('Пользователь с таким email или username уже существует');
        }
        const hashedPassword = await this.hashService.hash(createUserDto.password);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async findByUsername(username) {
        const user = await this.usersRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async findByUsernameWithPassword(username) {
        return this.usersRepository.findOne({ where: { username } });
    }
    async updateById(id, updateUserDto) {
        const user = await this.findById(id);
        if (updateUserDto.password) {
            updateUserDto.password = await this.hashService.hash(updateUserDto.password);
        }
        if (updateUserDto.username && updateUserDto.username !== user.username) {
            const existing = await this.usersRepository.findOne({
                where: { username: updateUserDto.username },
            });
            if (existing) {
                throw new common_1.ConflictException('Пользователь с таким username уже существует');
            }
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existing = await this.usersRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (existing) {
                throw new common_1.ConflictException('Пользователь с таким email уже существует');
            }
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }
    async findMany(query) {
        return this.usersRepository
            .createQueryBuilder('user')
            .where('user.username ILIKE :query OR user.email ILIKE :query', {
            query: `%${query}%`,
        })
            .getMany();
    }
    async getUserWishes(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: [
                'wishes',
                'wishes.owner',
                'wishes.offers',
                'wishes.offers.user',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user.wishes;
    }
    async getUserWishesByUsername(username) {
        const user = await this.usersRepository.findOne({
            where: { username },
            relations: [
                'wishes',
                'wishes.owner',
                'wishes.offers',
                'wishes.offers.user',
            ],
        });
        if (!user) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        return user.wishes;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        hash_service_1.HashService])
], UsersService);
//# sourceMappingURL=users.service.js.map