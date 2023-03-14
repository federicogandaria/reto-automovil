export class BaseRepository<T> {
  protected readonly db: Array<T>;

  constructor() {
    this.db = new Array<T>();
  }
}
