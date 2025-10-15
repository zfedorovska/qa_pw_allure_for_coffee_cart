import { test } from '../../_fixtures/fixtures';
import { allure } from 'allure-playwright';


test.describe('Admin edit menu', () => {
  test.beforeEach(async () => {
    await allure.parentSuite('Admin site');
    await allure.suite('Admin edit menu');
    await allure.subSuite('Add to menu');
    await allure.epic('CoffeeCart Admin site');
    await allure.feature('Edit menu');
    await allure.severity('critical');
  });

  test('New coffee can be added to the Menu', async ({ page }) => {
    await allure.story('User can add new coffee to the menu');

    await page.goto('/admin');
    // …your steps…
  });
});
