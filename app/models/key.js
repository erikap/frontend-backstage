import Model, { attr, hasMany } from '@ember-data/model';

export default class KeyModel extends Model {
  @attr uri
  @attr label
  @attr notation
  @attr('number') position

  @hasMany('score-part-template') templates
}
