import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import calculatePosition from '../../../utils/calculate-position';

export default class AuthSystemInstrumentsController extends Controller {
  @service store

  @tracked instrumentLabel

  @task
  *addInstrument(event) {
    const instrument = this.store.createRecord('instrument', {
      label: this.instrumentLabel,
      position: this.model.length ? 0 : 100
    });
    yield instrument.save();

    if (this.model.length) {
      // recalculate position of the previous first element
      // to make sure our new element appears first in the list
      const firstInstrument = this.model.objectAt(0);
      firstInstrument.position = calculatePosition([instrument, ...this.model.slice(0)], 1);
      yield firstInstrument.save();
    }

    this.send('refreshModel');

    this.instrumentLabel = null;

    event.preventDefault();
  }
}
