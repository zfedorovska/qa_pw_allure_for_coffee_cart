import { test } from '../../../_fixtures/fixtures';
import { allure } from 'allure-playwright';

import { COFFEE_NAMES } from '../../../../src/constants';

test.describe('Cart > Update with removal', () => {
  // Shared Allure labels for this file/suite
  test.beforeEach(async () => {
    await allure.parentSuite('Customer site');
    await allure.suite('Cart');
    await allure.subSuite('Cart update with removal');
    await allure.epic('CoffeeCart Customer site');
    await allure.feature('Cart');
    await allure.severity('critical');
  });

  test('Cart updated correctly after clicking minus for drinks', async ({ cartPage, menuPage }) => {
    await allure.story('User can remove a coffee cup from the cart');
    await allure.parameter('drinks', `${COFFEE_NAMES.espresso}, ${COFFEE_NAMES.cappuccino}`);

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
  });
});
