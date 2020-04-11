import Model, { attr, belongsTo } from '@ember-data/model';

export default class InstrumentPartModel extends Model {
  @attr uri
  @attr label

  @belongsTo('instrument') instrument
}
