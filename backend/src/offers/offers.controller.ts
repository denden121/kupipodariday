import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Post()
  async create(
    @Body() createOfferDto: CreateOfferDto,
    @AuthUser() authUser: JwtPayload,
  ) {
    const user = await this.usersService.findById(authUser.userId);
    return this.offersService.create(createOfferDto, user);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.offersService.findById(id);
  }
}
