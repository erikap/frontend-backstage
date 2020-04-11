import Model, { attr } from '@ember-data/model';

export default class ScoreStatusModel extends Model {
  @attr uri
  @attr label
}
