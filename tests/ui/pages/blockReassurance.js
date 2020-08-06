const ModuleConfiguration = require('prestashop_test_lib/kernel/common/BO/modules/moduleConfiguration');

class BlockReassurance extends ModuleConfiguration.constructor {
  constructor() {
    super();

    this.pageSubtitle = 'Customer Reassurance';
  }
}

module.exports = new BlockReassurance();
