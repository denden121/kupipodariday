import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
    @AuthUser() authUser: JwtPayload,
  ) {
    const user = await this.usersService.findById(authUser.userId);
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @AuthUser() authUser: JwtPayload,
  ) {
    return this.wishlistsService.updateById(
      id,
      updateWishlistDto,
      authUser.userId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() authUser: JwtPayload,
  ) {
    return this.wishlistsService.deleteById(id, authUser.userId);
  }
}
