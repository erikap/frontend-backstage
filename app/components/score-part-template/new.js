import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ScorePartTemplateNewComponent extends Component {
  @service store

  @tracked part
  @tracked position

  @action
  selectInstrumentPart(part) {
    this.part = part;
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

    this.args.onSave();
  }
}
