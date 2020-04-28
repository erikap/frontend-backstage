import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class AuthSystemInstrumentsRoute extends Route {
  model() {
    return this.store.query('instrument', {
      page: {
        size: 100,
        number: 0
      },
      sort: 'position'
    });
  }

  @action
  refreshModel() {
    this.refresh();
  }
}
