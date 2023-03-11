import { ClienteEntity, VendedorEntity } from 'src/persistence/entities';

export interface IAutomovil {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  vendedor: VendedorEntity;
  cliente?: ClienteEntity;
}
