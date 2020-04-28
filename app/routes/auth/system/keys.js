import Route from '@ember/routing/route';

export default class AuthSystemKeysRoute extends Route {
  model() {
    return this.store.query('key', {
      page: {
        size: 100,
        number: 0
      },
      sort: 'position'
    });
  }
}
