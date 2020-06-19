import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormKeySelectComponent extends Component {
  @service store

  @tracked options = []
  @tracked selectedId

  constructor() {
    super(...arguments);
    this.loadData.perform();
    this.selectedId = (this.args.value && this.args.value.id) || "0";
  }

  get label() {
    return this.args.label || "Toonaard";
  }

  @keepLatestTask
  *loadData() {
    const keys = yield this.store.query('key', {
      page: {
        size: 100,
        number: 0
      },
      sort: 'position'
    });

    this.options = keys.toArray();
  }

  @action
  selectOption(event) {
    this.selectedId = event.target.value;
    const key = this.options.find(c => c.id == this.selectedId);
    this.args.onChange(key);
  }
}
