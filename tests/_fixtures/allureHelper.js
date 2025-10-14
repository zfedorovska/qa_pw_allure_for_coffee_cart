import { allure as singleton } from 'allure-playwright';

/**
 * Returns an Allure adapter:
 *  - testInfo.allure (preferred; satisfies the assignment)
 *  - otherwise the singleton from allure-playwright
 *  - otherwise a no-op shim (so tests never crash)
 */
export function getAllure(testInfo) {
  const a = testInfo?.allure ?? singleton;
  if (a && typeof a.parentSuite === 'function') return a;
  // no-op shim
  return new Proxy(
    {},
    { get: () => () => {} }
  );
}
