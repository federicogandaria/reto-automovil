import { Injectable, NotFoundException } from '@nestjs/common';
import { VendedorEntity } from 'src/persistence/entities';
import { BaseRepository } from '../base.repository';
import { VendedorRepositoryInterface } from './vendedor.repository.interface';

@Injectable()
export class VendedorRepository
  extends BaseRepository<VendedorEntity>
  implements VendedorRepositoryInterface
{
  register(entity: VendedorEntity): VendedorEntity {
    this.db.push(entity);
    return this.db.at(-1) ?? entity;
  }

  update(id: string, entity: VendedorEntity): VendedorEntity {
    const indexCurrentEntity = this.db.findIndex((item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.db[indexCurrentEntity] = {
        ...this.db[indexCurrentEntity],
        ...entity,
        id,
      } as VendedorEntity;
    //Si lo que viene del if puede entrar a CustomerEntity? 2do check
    else throw new NotFoundException();
    return this.db[indexCurrentEntity];
  }

  delete(id: string): void {
    this.db.splice(
      this.db.findIndex((item) => item.id === id),
      1,
    );
  }

  findAll(): VendedorEntity[] {
    return this.db;
  }

  findOneById(id: string): VendedorEntity {
    const currentEntity = this.db.find((item) => item.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Elemento no encontrado');
  }
}
