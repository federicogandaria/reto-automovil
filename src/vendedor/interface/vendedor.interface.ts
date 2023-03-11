import { AutomovilEntity } from '../../persistence/entities/automovil.entity';

export interface IVendedor {
  id: string;
  nombre: string;
  autos: AutomovilEntity[];
}
