import { v4 as uuid } from 'uuid';
import { AutomovilEntity } from './automovil.entity';

export class ClienteEntity {
  id = uuid();
  nombre: string;
  automovil?: AutomovilEntity;
  vendedorId?: string;
  cocheComprado: AutomovilEntity[] = [];

  constructor(data: {
    nombre: string;
    automovil?: AutomovilEntity;
    cocheComprado: AutomovilEntity[];
  }) {
    this.id = uuid();
    this.nombre = data.nombre;
    this.automovil = data.automovil;
    this.cocheComprado = data.cocheComprado;
  }
}
