import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockModel } from '../core/helpers/testing/mock-model';
import { AnimalsService } from './animals.service';
import { Cat } from './schemas/cat.schema';

const catStub = { name: 'Whiskers', age: 3, breed: 'Persian' };
class CatModelMock extends MockModel<Cat> {
  protected entityStub = catStub;
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

  it('should create a cat', async () => {
    // The save() simply creates an instance of the mongo document. This is why we have to test the save() method on the Prototype of the model
    const saveSpy = jest.spyOn(CatModelMock.prototype, 'save');
    const constructorSpy = jest.spyOn(CatModelMock.prototype, 'constructorSpy');

    const result = await service.create(catStub);

    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(constructorSpy).toHaveBeenCalledWith(catStub);
    expect(result).toEqual(catStub);
  });
});
