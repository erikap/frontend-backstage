import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { all } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InstrumentCardComponent extends Component {
  @service store

  @tracked templates = []
  @tracked part
  @tracked position

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  get sortedTemplates() {
    return this.templates.sortBy('position');
  }

  @task
  *loadData() {
    const templates = yield this.args.model.templates;
    this.templates = templates.sortBy('position');
  }

  @keepLatestTask
  *sortTemplates({ draggedItem, sourceList, sourceIndex, targetList, targetIndex }) {
    if (sourceList === targetList && sourceIndex === targetIndex) return;

    sourceList.removeAt(sourceIndex);
    targetList.insertAt(targetIndex, draggedItem);

    this.templates = targetList;

    const prevPosition = targetIndex > 0 ? this.templates[targetIndex - 1].position : 0;
    const lastIdx = this.templates.length - 1;
    const nextPosition = targetIndex < lastIdx ? this.templates[targetIndex + 1].position : this.templates[lastIdx - 1].position + 2;
    const position = (prevPosition + nextPosition)/2;

    draggedItem.position = position;
    yield draggedItem.save();
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

  @action
  selectInstrumentPart(part) {
    this.part = part;
  }
}
