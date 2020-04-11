import Model, { attr } from '@ember-data/model';

export default class KeyModel extends Model {
  @attr uri
  @attr label
}
