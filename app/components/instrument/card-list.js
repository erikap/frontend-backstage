import Component from '@glimmer/component';
import { task, keepLatestTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

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

    const prevPosition = targetIndex > 0 ? this.instruments[targetIndex - 1].position : 0;
    const lastIdx = this.instruments.length - 1;
    const nextPosition = targetIndex < lastIdx ? this.instruments[targetIndex + 1].position : this.instruments[lastIdx - 1].position + 2;
    const position = (prevPosition + nextPosition)/2;

    draggedItem.position = position;
    yield draggedItem.save();
  }

}
