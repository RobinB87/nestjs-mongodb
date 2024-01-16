import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './controllers/animals.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
