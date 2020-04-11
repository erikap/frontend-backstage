import Model, { attr } from '@ember-data/model';

export default class ClefModel extends Model {
  @attr uri
  @attr label
}
