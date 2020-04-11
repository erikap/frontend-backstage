import Model, { attr, hasMany } from '@ember-data/model';

export default class ClefModel extends Model {
  @attr uri
  @attr label

  @hasMany('score-part-template') templates
}
