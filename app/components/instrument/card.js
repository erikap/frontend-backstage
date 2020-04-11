import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InstrumentCardComponent extends Component {
  @service store

  @tracked part
  @tracked position

  get sortedTemplates() {
    return this.args.model.templates.sortBy('position');
  }

  @task
  *addPartTemplate(event) {
    const template = this.store.createRecord('score-part-template', {
      position: this.position,
      instrument: this.args.model,
      instrumentPart: this.part
    });
    yield template.save();
    this.position = null;
    this.part = null;

    event.preventDefault();
  }

  @task
  *createInstrumentPart(label) {
    const part = this.store.createRecord('instrument-part', {
      label: label
    });
    yield part.save();
    this.part = part;
  }

  @action
  selectInstrumentPart(part) {
    this.part = part;
  }
}
