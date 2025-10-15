import { test } from '../../../_fixtures/fixtures';
import { allure } from 'allure-playwright';

import { totalPriceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Menu > Add Coffee', () => {
  // Shared Allure labels for this suite/file
  test.beforeEach(async () => {
    await allure.parentSuite('Customer site');
    await allure.suite('Menu');
    await allure.subSuite('Add Coffee');
    await allure.epic('CoffeeCart Customer site');
    await allure.feature('Menu');
    await allure.severity('critical');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`Total cost is updated after clicking the ${coffee} cup`, async ({ menuPage }) => {
      await allure.story('User sees updated total after clicking a coffee cup');
      await allure.parameter('coffee', coffee);
      await allure.parameter('price', String(price));

      const totalPriceStr = totalPriceFormatStr(price);

      await menuPage.open();
      await menuPage.clickCoffeeCup(coffee);
      await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    });
  });
});
