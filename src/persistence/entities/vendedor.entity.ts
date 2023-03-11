import { v4 as uuid } from 'uuid';

export class VendedorEntity {
  id = uuid();
  nombre: string;
  autos: [];
}
