import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | auth/system/instruments', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:auth/system/instruments');
    assert.ok(route);
  });
});
