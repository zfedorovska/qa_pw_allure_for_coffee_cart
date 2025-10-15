import { test } from '../../../_fixtures/fixtures';
import { allure } from 'allure-playwright';

import { priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

test.describe('Cart > Update with adding', () => {
  // Shared Allure labels for this suite/file
  test.beforeEach(async () => {
    await allure.parentSuite('Customer site');
    await allure.suite('Cart');
    await allure.subSuite('Cart update with adding');
    await allure.epic('CoffeeCart Customer site');
    await allure.feature('Cart');
    await allure.severity('critical');
  });

  test('Cart updated correctly after clicking plus for drinks', async ({ cartPage, menuPage }) => {
    await allure.story('User can add a coffee cup to the cart');

    const oneCap = priceFormatStr(COFFEE_PRICES.cappuccino);
    const twoCap = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
    const oneEsp = priceFormatStr(COFFEE_PRICES.espresso);
    const twoEsp = priceFormatStr(COFFEE_PRICES.espresso * 2);
    const totalNum = COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
    const total = priceFormatStr(totalNum);

    await allure.parameter('cappuccino(1x)', oneCap);
    await allure.parameter('cappuccino(2x)', twoCap);
    await allure.parameter('espresso(1x)', oneEsp);
    await allure.parameter('espresso(2x)', twoEsp);
    await allure.parameter('expected total', total);

    await menuPage.open();
    await menuPage.clickCoffeeCup(COFFEE_NAMES.cappuccino);
    await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.assertCoffeeTotalCostContainsCorrectText(COFFEE_NAMES.espresso, oneEsp);

    await cartPage.clickCoffeeListItemAddOneButton(COFFEE_NAMES.espresso);

    await cartPage.assertCoffeeTotalCostContainsCorrectText(COFFEE_NAMES.espresso, twoEsp);
    await cartPage.assertCoffeeTotalCostContainsCorrectText(COFFEE_NAMES.cappuccino, oneCap);

    await cartPage.clickCoffeeListItemAddOneButton(COFFEE_NAMES.cappuccino);

    await cartPage.assertCoffeeTotalCostContainsCorrectText(COFFEE_NAMES.cappuccino, twoCap);
    await cartPage.assertCoffeeTotalCostContainsCorrectText(COFFEE_NAMES.espresso, twoEsp);

    await cartPage.assertTotalCheckoutContainsValue(total);
  });
});
