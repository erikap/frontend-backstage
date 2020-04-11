import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ScoreModel extends Model {
  @attr title
  @attr description
  @attr comment
  @attr genre
  @attr composer
  @attr arranger
  @attr duration
  @attr publisher
  @attr('datetime') created
  @attr('datetime') modified

  @belongsTo('score-status') status
  @hasMany('score-part') parts
  @hasMany('genre') genres
}
