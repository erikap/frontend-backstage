import Model, { attr } from '@ember-data/model';

export default class GenreModel extends Model {
  @attr uri
  @attr label
}
