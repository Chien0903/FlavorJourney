import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsUrl,
  Min,
  Max,
} from 'class-validator';

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  name_japanese: string;

  @IsString()
  @IsNotEmpty()
  name_vietnamese: string;

  @IsOptional()
  @IsString()
  name_romaji?: string;

  @IsOptional()
  @IsString()
  description_japanese?: string;

  @IsOptional()
  @IsString()
  description_vietnamese?: string;

  @IsOptional()
  @IsString()
  description_romaji?: string;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsInt()
  region_id?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  spiciness_level?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  saltiness_level?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  sweetness_level?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  sourness_level?: number;

  @IsOptional()
  @IsString()
  ingredients?: string;

  @IsOptional()
  @IsString()
  how_to_eat?: string;
}
