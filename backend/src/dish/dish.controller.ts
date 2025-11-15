import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dtos/create-dish.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addDish(@Body() createDishDto: CreateDishDto, @Req() req) {
    const userId = req.user.id;
    return this.dishService.createDish(createDishDto, userId);
  }
}
