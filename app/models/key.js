import Model, { attr, hasMany } from '@ember-data/model';

export default class KeyModel extends Model {
  @attr uri
  @attr label

  @hasMany('score-part-template') templates
}
