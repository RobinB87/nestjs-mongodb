import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnimalsService } from '../animals.service';
import { CreateCatDto } from '../dtos/create-cat-dto';
import { Cat } from '../schemas/cat.schema';

@Controller('/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(@Body() input: CreateCatDto): Promise<Cat> {
    return this.animalsService.create(input);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.animalsService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<Cat> {
    return this.animalsService.findById(id);
  }
}
