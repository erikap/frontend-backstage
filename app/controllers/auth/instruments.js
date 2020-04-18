import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';

export default class AuthInstrumentsController extends Controller {
  @service store

  @tracked instrumentLabel

  @task
  *addInstrument(event) {
    const instrument = this.store.createRecord('instrument', {
      label: this.instrumentLabel,
      position: 0
    });
    yield instrument.save();
    this.send('refreshModel');
    this.instrumentLabel = null;

    event.preventDefault();
  }
}
