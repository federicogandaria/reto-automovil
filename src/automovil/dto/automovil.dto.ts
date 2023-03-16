import { ClienteEntity, VendedorEntity } from 'src/persistence/entities';

export class AutomovilDto {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  cliente?: ClienteEntity;
  vendedor?: VendedorEntity;
}
