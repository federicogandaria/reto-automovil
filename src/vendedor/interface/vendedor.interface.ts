import { AutomovilEntity } from 'src/persistence/entities';

export interface IVendedor {
  id: string;
  nombre: string;
  cochesVendidos?: AutomovilEntity[];
}
