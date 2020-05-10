import Component from '@glimmer/component';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import calculatePosition from '../../utils/calculate-position';

export default class KeyListComponent extends Component {
  @tracked keys = []

  constructor() {
    super(...arguments);
    this.keys = this.args.model.sortBy('position');
  }

  get hasMultipleItems() {
    return this.keys.length > 1;
  }

  @keepLatestTask
  *sortKeys({ draggedItem, sourceList, sourceIndex, targetList, targetIndex }) {
    if (sourceList === targetList && sourceIndex === targetIndex) return;

    sourceList.removeAt(sourceIndex);
    targetList.insertAt(targetIndex, draggedItem);
    this.keys = targetList;

    draggedItem.position = calculatePosition(this.keys, targetIndex);
    yield draggedItem.save();
  }
}
