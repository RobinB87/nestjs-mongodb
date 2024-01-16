import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockModel } from '../core/helpers/testing/mock-model';
import { AnimalsService } from './animals.service';
import { Cat } from './schemas/cat.schema';

class CatModelMock extends MockModel<Cat> {
  protected entityStub = { name: 'Whiskers', age: 3, breed: 'Persian' };
}

describe('AnimalsService', () => {
  let service: AnimalsService;
  let catModel: CatModelMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getModelToken(Cat.name),
          useValue: CatModelMock,
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    catModel = module.get<CatModelMock>(getModelToken(Cat.name));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
