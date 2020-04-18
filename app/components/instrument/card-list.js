import Component from '@glimmer/component';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';
import calculatePosition from '../../utils/calculate-position';

export default class InstrumentCardListComponent extends Component {
  @tracked instruments = []

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  get sortedInstruments() {
    return this.instruments.sortBy('position');
  }

  get hasMultipleItems() {
    return this.instruments.length > 1;
  }

  @task
  *loadData() {
    this.instruments = this.args.model.slice(0).sortBy('position');
  }

  @keepLatestTask
  *sortInstruments({ draggedItem, sourceList, sourceIndex, targetList, targetIndex }) {
    if (sourceList === targetList && sourceIndex === targetIndex) return;

    sourceList.removeAt(sourceIndex);
    targetList.insertAt(targetIndex, draggedItem);
    this.instruments = targetList;

    draggedItem.position = calculatePosition(this.instruments, targetIndex);
    yield draggedItem.save();
  }

}
