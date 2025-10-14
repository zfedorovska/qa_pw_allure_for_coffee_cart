import { test } from '../../../_fixtures/fixtures';
import { getAllure } from '../../../_fixtures/allureHelper';
import { unitPriceFormatStr, priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

// Build param set
const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Cart > Add to cart', () => {
  // Shared Allure labels
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Customer site');
    a.suite('Cart');
    a.subSuite('Add to cart');
    a.epic('CoffeeCart Customer site');
    a.feature('Cart');
    a.severity('blocker');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`The ${coffee} is correctly added to the Cart`, async ({ menuPage, cartPage }, testInfo) => {
      // ✅ Use helper here too
      const a = getAllure(testInfo);
      a.story('User can add a coffee cup to the cart');
      a.parameter('coffee', coffee);
      a.parameter('price', String(price));

      const totalPriceStr = priceFormatStr(price);
      const unitPriceStr = unitPriceFormatStr(price, 1);

      await menuPage.open();
      await menuPage.clickCoffeeCup(coffee);

      await menuPage.clickCartLink();
      await cartPage.waitForLoading();

      await cartPage.assertCoffeeNameContainsCorrectText(coffee);
      await cartPage.assertCoffeeUnitContainsCorrectText(coffee, unitPriceStr);
      await cartPage.assertCoffeeTotalCostContainsCorrectText(coffee, totalPriceStr);
    });
  });
});
