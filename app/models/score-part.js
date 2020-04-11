import Model, { attr, belongsTo } from '@ember-data/model';

export default class ScorePartModel extends Model {
  @attr('datetime') created
  @attr('datetime') modified

  @belongsTo('score') score
  @belongsTo('instrument') intrument
  @belongsTo('instrument-part') intrumentPart
  @belongsTo('key') key
  @belongsTo('clef') clef
  @belongsTo('file') file
}
