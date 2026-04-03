import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import type { JwtPayload } from '../common/decorators/auth-user.decorator';

@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({ groups: ['me'] })
  @Get('me')
  getMe(@AuthUser() user: JwtPayload) {
    return this.usersService.findById(user.userId);
  }

  @SerializeOptions({ groups: ['me'] })
  @Patch('me')
  updateMe(@AuthUser() user: JwtPayload, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(user.userId, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@AuthUser() user: JwtPayload) {
    return this.usersService.getUserWishes(user.userId);
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get(':username/wishes')
  getUserWishes(@Param('username') username: string) {
    return this.usersService.getUserWishesByUsername(username);
  }

  @Post('find')
  findUsers(@Body('query') query: string) {
    return this.usersService.findMany(query);
  }
}
