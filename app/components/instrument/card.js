import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { all } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import calculatePosition from '../../utils/calculate-position';

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

  get hasMultipleItems() {
    return this.templates.length > 1;
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

    draggedItem.position = calculatePosition(this.templates, targetIndex);
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
