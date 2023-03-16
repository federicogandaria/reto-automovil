export class BaseRepository<T> {
  protected readonly db: Array<T>;

  constructor() {
    this.db = new Array<T>();
  }
  register(entity: T): T {
    this.db.push(entity);
    return entity;
  }
  findAll(): Array<T> {
    return this.db;
  }
  findOneById(id: string): T {
    const index = this.db.findIndex((item) => {
      const itemID = (item as any).id || '';
      return itemID === id;
    });

    if (index < 0) {
      throw new Error(`No se encontró un registro con el ID '${id}'.`);
    }

    return this.db[index];
  }

  delete(id: string): void {
    const index = this.db.findIndex((item) => {
      const itemID = (item as any).id || '';
      return itemID === id;
    });

    if (index < 0) {
      throw new Error(`No se encontró un registro con el ID '${id}'.`);
    }

    this.db.splice(index, 1);
  }
  update(id: string, entity: T): T {
    const index = this.db.findIndex((item) => {
      const itemID = (item as any).id || '';
      return itemID === id;
    });

    if (index < 0) {
      throw new Error(`No se encontró un registro con el ID '${id}'.`);
    }

    this.db[index] = entity;
    return entity;
  }
}
