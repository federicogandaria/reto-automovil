import { AutomovilEntity } from 'src/persistence/entities';

export interface IVendedor {
  id: string;
  nombre: string;
  autos: AutomovilEntity[];
  cochesVendidos?: {
    id: string;
    auto: AutomovilEntity;
  }[];
}
