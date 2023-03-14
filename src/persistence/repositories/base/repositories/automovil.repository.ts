import { Injectable, NotFoundException } from '@nestjs/common';
import { AutomovilEntity } from 'src/persistence/entities';
import { BaseRepository } from '../base.repository';
import { AutomovilRepositoryInterface } from './automovil.repository.interface';

@Injectable()
export class AutomovilRepository
  extends BaseRepository<AutomovilEntity>
  implements AutomovilRepositoryInterface
{
  register(entity: AutomovilEntity): AutomovilEntity {
    this.db.push(entity);
    return this.db.at(-1) ?? entity;
  }

  update(id: string, entity: AutomovilEntity): AutomovilEntity {
    const indexCurrentEntity = this.db.findIndex((item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.db[indexCurrentEntity] = {
        ...this.db[indexCurrentEntity],
        ...entity,
        id,
      } as AutomovilEntity;
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

  findAll(): AutomovilEntity[] {
    return this.db;
  }

  findOneById(id: string): AutomovilEntity {
    const currentEntity = this.db.find((item) => item.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Elemento no encontrado');
  }
}
