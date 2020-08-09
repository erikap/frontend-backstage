import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class FormClefSelectComponent extends Component {
  @service store;

  @tracked options = [];
  @tracked selectedId;

  selectInputId = 'clef-select-' + guidFor(this);

  constructor() {
    super(...arguments);
    this.loadData.perform();
    this.selectedId = (this.args.value && this.args.value.id) || "0";
  }

  get label() {
    return this.args.label || "Sleutel";
  }

  @keepLatestTask
  *loadData() {
    const clefs = yield this.store.query('clef', {
      page: {
        size: 100,
        number: 0
      },
      sort: 'position'
    });

    this.options = clefs.toArray();
  }

  @action
  selectOption(event) {
    this.selectedId = event.target.value;
    const clef = this.options.find(c => c.id == this.selectedId);
    this.args.onChange(clef);
  }
}
