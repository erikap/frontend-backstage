import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class AuthInstrumentsRoute extends Route {
  model() {
    return this.store.query('instrument', {
      page: {
        size: 20,
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
