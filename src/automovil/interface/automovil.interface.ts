import {
  VendedorEntity,
  ClienteEntity,
  AutomovilEntity,
} from 'src/persistence/entities';

export interface IAutomovil {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  vendedor: VendedorEntity & { autos: AutomovilEntity[] };
  cliente?: ClienteEntity;
}
