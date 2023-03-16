import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteEntity } from 'src/persistence/entities';
import { BaseRepository } from '../base.repository';
import { ClienteRepositoryInterface } from './cliente.repository.interface';

@Injectable()
export class ClienteRepository
  extends BaseRepository<ClienteEntity>
  implements ClienteRepositoryInterface
{
  register(entity: ClienteEntity): ClienteEntity {
    this.db.push(entity);
    return this.db.at(-1) ?? entity;
  }

  update(id: string, entity: ClienteEntity): ClienteEntity {
    const indexCurrentEntity = this.db.findIndex((item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.db[indexCurrentEntity] = {
        ...this.db[indexCurrentEntity],
        ...entity,
        id,
      } as ClienteEntity;
    //Si lo que viene del if puede entrar a CustomerEntity? 2do check
    else throw new NotFoundException();
    return this.db[indexCurrentEntity];
  }

  delete(id: string): boolean {
    const index = this.db.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.db.splice(index, 1);
      return true;
    }
    return false;
  }

  findAll(): ClienteEntity[] {
    return this.db;
  }

  findOneById(id: string): ClienteEntity {
    const currentEntity = this.db.find((item) => item.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Elemento no encontrado');
  }
}
