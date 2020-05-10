import Component from '@glimmer/component';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import calculatePosition from '../../utils/calculate-position';

export default class ClefListComponent extends Component {
  @tracked clefs = []

  constructor() {
    super(...arguments);
    this.clefs = this.args.model.sortBy('position');
  }

  get hasMultipleItems() {
    return this.clefs.length > 1;
  }

  @keepLatestTask
  *sortClefs({ draggedItem, sourceList, sourceIndex, targetList, targetIndex }) {
    if (sourceList === targetList && sourceIndex === targetIndex) return;

    sourceList.removeAt(sourceIndex);
    targetList.insertAt(targetIndex, draggedItem);
    this.clefs = targetList;

    draggedItem.position = calculatePosition(this.clefs, targetIndex);
    yield draggedItem.save();
  }
}
