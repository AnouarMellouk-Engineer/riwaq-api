import { Test, TestingModule } from '@nestjs/testing';
import { SchoolOwnerController } from './school-owner.controller';

describe('SchoolOwnerController', () => {
  let controller: SchoolOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolOwnerController],
    }).compile();

    controller = module.get<SchoolOwnerController>(SchoolOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
