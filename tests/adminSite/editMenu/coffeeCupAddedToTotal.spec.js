// tests/adminSite/editMenu/coffeeCupAddedToTotal.spec.js
import { test } from '../../_fixtures/fixtures';
import { getAllure } from '../../_fixtures/allureHelper';

test.describe('Admin edit menu', () => {
  test.beforeEach(async ({}, testInfo) => {
    const a = getAllure(testInfo);
    a.parentSuite('Admin site');
    a.suite('Admin edit menu');
    a.subSuite('Add to menu');
    a.epic('CoffeeCart Admin site');
    a.feature('Edit menu');
    a.severity('critical');
  });

  test('New coffee can be added to the Menu', async ({ page }, testInfo) => {
    const a = getAllure(testInfo);
    a.story('User can add new coffee to the menu');

    await page.goto('/admin');
    // …your steps…
  });
});
