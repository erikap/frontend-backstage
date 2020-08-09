import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class AuthSystemController extends Controller {
  @service router

  get isActiveInstruments() {
    return this.isActiveRoute('instruments');
  }

  get isActiveClefs() {
    return this.isActiveRoute('clefs');
  }

  get isActiveKeys() {
    return this.isActiveRoute('keys');
  }

  isActiveRoute(subroute) {
    return this.router.currentRouteName.startsWith(`auth.system.${subroute}`);
  }
}
