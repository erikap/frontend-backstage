import Model, { attr, belongsTo } from '@ember-data/model';

export default class ScorePartTemplateModel extends Model {
  @attr('number') position

  @belongsTo('instrument') instrument
  @belongsTo('instrument-part') instrumentPart
  @belongsTo('key') key
  @belongsTo('clef') clef
}
