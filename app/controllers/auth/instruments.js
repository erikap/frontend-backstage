import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';

export default class AuthInstrumentsController extends Controller {
  @service store

  @task
  *addInstrument() {
    const position = parseInt(this.instrumentPosition);
    const instrument = this.store.createRecord('instrument', {
      label: this.instrumentLabel,
      position: position
    });
    yield instrument.save();
    this.send('refreshModel');
    this.instrumentPosition = null;
    this.instrumentLabel = null;
  }
}
