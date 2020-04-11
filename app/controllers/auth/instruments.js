import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class AuthInstrumentsController extends Controller {
  @service store

  @tracked instrumentPosition
  @tracked instrumentLabel

  @task
  *addInstrument(event) {
    const instrument = this.store.createRecord('instrument', {
      label: this.instrumentLabel,
      position: this.instrumentPosition
    });
    yield instrument.save();
    this.send('refreshModel');
    this.instrumentPosition = null;
    this.instrumentLabel = null;

    event.preventDefault();
  }
}
