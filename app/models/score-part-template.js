import Model, { attr, belongsTo } from '@ember-data/model';

export default class ScorePartTemplateModel extends Model {
  @attr('number') position

  @belongsTo('instrument') intrument
  @belongsTo('instrument-part') intrumentPart
  @belongsTo('key') key
  @belongsTo('clef') clef
}
