import { ClienteEntity, VendedorEntity } from 'src/persistence/entities';

export class AutomovilDto {
  marca: string;
  modelo: string;
  año: number;
  cliente?: ClienteEntity;
  vendedor?: VendedorEntity;
}