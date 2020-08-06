const {expect} = require('chai');
const helper = require('prestashop_test_lib/kernel/utils/helpers');
const VersionSelectResolver = require('prestashop_test_lib/kernel/resolvers/VersionSelectResolver');
const customConfigClassMap = require('../customConfigClassMap.js')

// Importing pages

let browserContext;
let page;
const version = '177';
const versionSelectResolver = new VersionSelectResolver(version, customConfigClassMap);
const loginPage = versionSelectResolver.require('kernel/common/BO/login/index.js');
const dashboardPage = versionSelectResolver.require('kernel/common/BO/dashboard/index.js');
const moduleManagerPage = versionSelectResolver.require('kernel/common/BO/modules/moduleManager/index.js')
const blockReassurancePage = versionSelectResolver.require('pages/blockReassurance.js')

describe(`Check BlockReassurance test`, async () => {
  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);

    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  it('should go to login page', async () => {
    await loginPage.goTo(page, global.BO.URL);
    const pageTitle = await loginPage.getPageTitle(page);
    await expect(pageTitle).to.contains(loginPage.pageTitle);
  });

  it('should log in', async () => {
    await loginPage.login(page, 'demo@prestashop.com', 'prestashop_demo');
    const pageTitle = await dashboardPage.getPageTitle(page);
    await expect(pageTitle).to.contains(dashboardPage.pageTitle);
  });

  it('should go to module manager page', async () => {
    await dashboardPage.goToSubMenu(
      page,
      dashboardPage.modulesParentLink,
      dashboardPage.moduleManagerLink,
    );

    const pageTitle = await moduleManagerPage.getPageTitle(page);
    await expect(pageTitle).to.contains(moduleManagerPage.pageTitle);
  });

  it('should go to login manager page', async () => {
    await moduleManagerPage.searchModule(
      page,
      'blockReassurance',
      'Customer Reassurance',
    );

    await moduleManagerPage.goToConfigurationPage(page, 'Customer Reassurance');


    const pageSubtitle = await blockReassurancePage.getPageSubtitle(page);
    await expect(pageSubtitle).to.contains(blockReassurancePage.pageSubtitle);
  });
});
