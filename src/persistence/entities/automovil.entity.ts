import { v4 as uuid } from 'uuid';
import { ClienteEntity, VendedorEntity } from '.';

export class AutomovilEntity {
  id = uuid();
  marca: string;
  modelo: string;
  año: number;
  vendedor?: VendedorEntity;
  cliente?: ClienteEntity;
}
