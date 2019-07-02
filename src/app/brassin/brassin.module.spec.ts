import { BrassinModule } from './brassin.module';

describe('BrassinModule', () => {
  let brassinModule: BrassinModule;

  beforeEach(() => {
    brassinModule = new BrassinModule();
  });

  it('should create an instance', () => {
    expect(brassinModule).toBeTruthy();
  });
});
