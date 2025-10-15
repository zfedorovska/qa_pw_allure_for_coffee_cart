import { test } from '../../../_fixtures/fixtures';
import { allure } from 'allure-playwright';

import { unitPriceFormatStr, priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

// Build param set
const testParameters = Object.entries(COFFEE_NAMES).map(([key, name]) => ({
  coffee: name,
  price: COFFEE_PRICES[key],
}));

test.describe('Cart > Add to cart', () => {
  // Shared Allure labels
  test.beforeEach(async () => {
    await allure.parentSuite('Customer site');
    await allure.suite('Cart');
    await allure.subSuite('Add to cart');
    await allure.epic('CoffeeCart Customer site');
    await allure.feature('Cart');
    await allure.severity('blocker');
  });

  testParameters.forEach(({ coffee, price }) => {
    test(`The ${coffee} is correctly added to the Cart`, async ({ menuPage, cartPage }) => {
      await allure.story('User can add a coffee cup to the cart');
      await allure.parameter('coffee', coffee);
      await allure.parameter('price', String(price));

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