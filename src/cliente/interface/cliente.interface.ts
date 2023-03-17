import { AutomovilEntity } from 'src/persistence/entities';

export interface ICliente {
  id: string;
  nombre: string;
  automovil?: AutomovilEntity;
  vendedorId?: string;
  cocheComprado: AutomovilEntity[];
}
