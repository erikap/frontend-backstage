import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ScorePartTemplateNewComponent extends Component {
  @service store

  @tracked part
  @tracked clef
  @tracked key
  @tracked position

  @action
  selectInstrumentPart(part) {
    this.part = part;
  }

  @action
  selectClef(clef) {
    this.clef = clef;
  }

  @action
  selectKey(key) {
    this.key = key;
  }

  @task
  *addPartTemplate(event) {
    const template = this.store.createRecord('score-part-template', {
      position: this.position,
      instrument: this.args.model,
      instrumentPart: this.part,
      clef: this.clef,
      key: this.key
    });
    yield template.save();
    this.position = null;
    this.part = null;
    this.clef = null;
    this.key = null;

    event.preventDefault();

    this.args.onSave();
  }
}
