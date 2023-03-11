import { v4 as uuid } from 'uuid';
import { ClienteEntity } from './cliente.entity';
import { VendedorEntity } from './vendedor.entity';

export class AutomovilEntity {
  id = uuid();
  marca: string;
  modelo: string;
  año: number;
  vendedor: VendedorEntity;
  cliente?: ClienteEntity;
}
