// reporters/allure-testinfo-adapter.js
const { allure } = require('allure-playwright');

/** @type {import('@playwright/test/reporter').Reporter} */
class AllureTestInfoAdapter {
  onTestBegin(test, testInfo) {
    // TEMP: prove the reporter runs
    // console.log('[adapter] inject for:', test.title);

    testInfo.allure = {
      parentSuite: (...a) => allure.parentSuite(...a),
      suite:       (...a) => allure.suite(...a),
      subSuite:    (...a) => allure.subSuite(...a),
      epic:        (...a) => allure.epic(...a),
      feature:     (...a) => allure.feature(...a),
      story:       (...a) => allure.story(...a),
      severity:    (...a) => allure.severity(...a),
      label:       (...a) => allure.label(...a),
      link:        (...a) => allure.link(...a),
      id:          (...a) => allure.id(...a),
      owner:       (...a) => allure.owner(...a),
      tag:         (...a) => allure.tag(...a),
      parameter:   (...a) => allure.parameter(...a),
    };
  }
}
module.exports = AllureTestInfoAdapter;
