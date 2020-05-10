import Component from '@glimmer/component';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import calculatePosition from '../../utils/calculate-position';

export default class InstrumentCardComponent extends Component {
  @tracked templates = []
  @tracked showCreateForm = false

  constructor() {
    super(...arguments);
    this.loadData.perform();
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

  @action
  addNewTemplate() {
    this.showCreateForm = false;
  }
}
