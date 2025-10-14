import { test } from '../../../_fixtures/fixtures';
import { getAllure } from '../../../_fixtures/allureHelper';
import { priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';

test.describe('Cart > Update with adding', () => {
  // Shared Allure labels for this suite/file
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Customer site');
    a.suite('Cart');
    a.subSuite('Cart update with adding');
    a.epic('CoffeeCart Customer site');
    a.feature('Cart');
    a.severity('critical');
  });

  test(
    'Cart updated correctly after clicking plus for drinks',
    async ({ cartPage, menuPage }, testInfo) => {
      const a = getAllure(testInfo);
      a.story('User can add a coffee cup to the cart');

      const oneCap = priceFormatStr(COFFEE_PRICES.cappuccino);
      const twoCap = priceFormatStr(COFFEE_PRICES.cappuccino * 2);
      const oneEsp = priceFormatStr(COFFEE_PRICES.espresso);
      const twoEsp = priceFormatStr(COFFEE_PRICES.espresso * 2);
      const totalNum = COFFEE_PRICES.cappuccino * 2 + COFFEE_PRICES.espresso * 2;
      const total = priceFormatStr(totalNum);

      a.parameter('cappuccino(1x)', oneCap);
      a.parameter('cappuccino(2x)', twoCap);
      a.parameter('espresso(1x)', oneEsp);
      a.parameter('espresso(2x)', twoEsp);
      a.parameter('expected total', total);

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
    }
  );
});
