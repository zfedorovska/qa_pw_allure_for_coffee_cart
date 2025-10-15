import { test } from '../../../_fixtures/fixtures';
import { allure } from 'allure-playwright';

import { priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Menu > View Coffee', () => {
  // Shared Allure labels
  test.beforeEach(async () => {
    await allure.parentSuite('Customer site');
    await allure.suite('Menu');
    await allure.subSuite('View Coffee');
    await allure.epic('CoffeeCart Customer site');
    await allure.feature('Menu');
    await allure.severity('minor');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`The ${coffee} cup has correct cost`, async ({ menuPage }) => {
      await allure.story('Coffee cup shows the correct price');
      await allure.parameter('coffee', coffee);
      await allure.parameter('price', String(price));

      const priceStr = priceFormatStr(price);

      await menuPage.open();
      await menuPage.assertCoffeeCupCostHasValue(coffee, priceStr);
    });
  });
});
