import Route from '@ember/routing/route';

export default class AuthSystemIndexRoute extends Route {
  beforeModel() {
    this.transitionTo('auth.system.instruments');
  }
}
