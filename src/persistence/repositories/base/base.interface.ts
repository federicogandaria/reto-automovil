export interface BaseRepositoryInterface<T> {
  register(entity: T): T;
  update(id: string, entity: T): T;
  delete(id: string): void;
  findAll(): Array<T>;
  findOneById(id: string): T;
}
