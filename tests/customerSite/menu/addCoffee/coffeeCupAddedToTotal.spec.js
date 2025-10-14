import { test } from '../../../_fixtures/fixtures';
import { getAllure } from '../../../_fixtures/allureHelper';
import { totalPriceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Menu > Add Coffee', () => {
  // Shared Allure labels for this suite/file
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Customer site');
    a.suite('Menu');
    a.subSuite('Add Coffee');
    a.epic('CoffeeCart Customer site');
    a.feature('Menu');
    a.severity('critical');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`Total cost is updated after clicking the ${coffee} cup`, async ({ menuPage }, testInfo) => {
      const a = getAllure(testInfo);
      a.story('User sees updated total after clicking a coffee cup');
      a.parameter('coffee', coffee);
      a.parameter('price', String(price));

      const totalPriceStr = totalPriceFormatStr(price);

      await menuPage.open();
      await menuPage.clickCoffeeCup(coffee);
      await menuPage.assertTotalCheckoutContainsValue(totalPriceStr);
    });
  });
});
