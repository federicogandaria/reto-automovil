import { v4 as uuid } from 'uuid';
import { AutomovilEntity } from './automovil.entity';

export class VendedorEntity {
  id = uuid();
  nombre: string;
  autos: AutomovilEntity[];
}
