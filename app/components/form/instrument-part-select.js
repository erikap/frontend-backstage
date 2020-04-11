import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class FormInstrumentPartSelectComponent extends Component {
  @service store

  @tracked options = []
  @tracked selected = null

  constructor() {
    super(...arguments);
    this.loadData.perform();
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
}
