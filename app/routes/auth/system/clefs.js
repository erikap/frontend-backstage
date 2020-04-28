import Route from '@ember/routing/route';

export default class AuthSystemClefsRoute extends Route {
  model() {
    return this.store.query('clef', {
      page: {
        size: 100,
        number: 0
      },
      sort: 'position'
    });
  }
}
