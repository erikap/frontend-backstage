import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class InstrumentPartModel extends Model {
  @attr uri
  @attr label

  @belongsTo('instrument') instrument

  @hasMany('score-part-template') templates
}
