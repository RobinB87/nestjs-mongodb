import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dtos/create-cat-dto';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(input: CreateCatDto): Promise<Cat> {
    const cat = new this.catModel(input);
    return cat.save();
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  findById(id: string): Promise<Cat> {
    return this.catModel.findById(id);
  }
}
