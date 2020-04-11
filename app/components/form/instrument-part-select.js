import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { keepLatestTask, task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class FormInstrumentPartSelectComponent extends Component {
  @service store

  @tracked options = []
  @tracked selected = null

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  get sortedOptions() {
    return this.options.sortBy('label');
  }

  @keepLatestTask
  *loadData() {
    const parts = yield this.store.query('instrument-part', {
      'filter[instrument][:id:]': this.args.instrument.id,
      page: {
        size: 100,
        number: 0
      },
      sort: 'label'
    });

    this.options = parts.toArray();
  }

  @task
  *createNew(label) {
    const part = this.store.createRecord('instrument-part', {
      label: label,
      instrument: this.args.instrument
    });
    yield part.save();
    this.options.pushObject(part);
    this.args.onChange(part);
  }

}
