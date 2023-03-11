import { v4 as uuid } from 'uuid';
import { AutomovilEntity } from './automovil.entity';

export class ClienteEntity {
  id = uuid();
  nombre: string;
  automovil?: AutomovilEntity;
}
