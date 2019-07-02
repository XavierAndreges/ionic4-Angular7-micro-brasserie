import { IngredientModule } from './ingredient.module';

describe('StockageModule', () => {
  let stockageModule: IngredientModule;

  beforeEach(() => {
    stockageModule = new IngredientModule();
  });

  it('should create an instance', () => {
    expect(stockageModule).toBeTruthy();
  });
});
