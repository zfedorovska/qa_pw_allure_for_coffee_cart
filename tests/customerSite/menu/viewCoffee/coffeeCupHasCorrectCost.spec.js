import { test } from '../../../_fixtures/fixtures';
import { getAllure } from '../../../_fixtures/allureHelper';
import { priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Menu > View Coffee', () => {
  // Shared Allure labels
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Customer site');
    a.suite('Menu');
    a.subSuite('View Coffee');
    a.epic('CoffeeCart Customer site');
    a.feature('Menu');
    a.severity('minor');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`The ${coffee} cup has correct cost`
      , async ({ menuPage }, testInfo) => {
      const a = getAllure(testInfo);
      a.story('Coffee cup shows the correct price');
      a.parameter('coffee', coffee);
      a.parameter('price', String(price));

      const priceStr = priceFormatStr(price);

      await menuPage.open();
      await menuPage.assertCoffeeCupCostHasValue(coffee, priceStr);
    });
  });
});
