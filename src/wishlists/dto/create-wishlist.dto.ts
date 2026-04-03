import {
  IsString,
  Length,
  MaxLength,
  IsUrl,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @MaxLength(1500)
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  itemsId: number[];
}
