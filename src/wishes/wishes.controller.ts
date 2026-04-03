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
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('last')
  getLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  getTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    return this.wishesService.create(createWishDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishesService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Request() req,
  ) {
    return this.wishesService.updateById(id, updateWishDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.wishesService.deleteById(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copy(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    return this.wishesService.copyWish(id, user);
  }
}
