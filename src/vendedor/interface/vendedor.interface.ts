import { AutomovilEntity } from 'src/persistence/entities';

export interface Vendedor {
  id: string;
  nombre: string;
  autos: AutomovilEntity[];
  cochesVendidos?: {
    id: string;
    auto: AutomovilEntity;
  }[];
}
