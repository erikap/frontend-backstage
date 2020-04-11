import Model, { attr, hasMany } from '@ember-data/model';

export default class InstrumentModel extends Model {
  @attr uri
  @attr label
  @attr('number') position

  @hasMany('instrument-part') parts
  @hasMany('score-part-template') templates
}
