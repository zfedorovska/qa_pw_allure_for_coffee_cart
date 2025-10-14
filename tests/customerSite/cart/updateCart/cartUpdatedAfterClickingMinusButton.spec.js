import { test } from '../../../_fixtures/fixtures';
import { getAllure } from '../../../_fixtures/allureHelper';
import { COFFEE_NAMES } from '../../../../src/constants';

test.describe('Cart > Update with removal', () => {
  // Shared Allure labels for this file/suite
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Customer site');
    a.suite('Cart');
    a.subSuite('Cart update with removal');
    a.epic('CoffeeCart Customer site');
    a.feature('Cart');
    a.severity('critical');
  });

  test(
    'Cart updated correctly after clicking minus for drinks',
    async ({ cartPage, menuPage }, testInfo) => {
      const a = getAllure(testInfo);
      a.story('User can remove a coffee cup from the cart');
      a.parameter('drinks', `${COFFEE_NAMES.espresso}, ${COFFEE_NAMES.cappuccino}`);

      await menuPage.open();
      await menuPage.clickCoffeeCup(COFFEE_NAMES.cappuccino);
      await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

      await menuPage.clickCartLink();
      await cartPage.waitForLoading();

      await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.espresso);
      await cartPage.clickCoffeeListItemRemoveOneButton(COFFEE_NAMES.espresso);
      await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.espresso);

      await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.cappuccino);
      await cartPage.clickCoffeeListItemRemoveOneButton(COFFEE_NAMES.cappuccino);
      await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.cappuccino);

      await cartPage.assertNoCoffeeMessageIsVisible();
    }
  );
});