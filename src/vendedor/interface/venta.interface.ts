import { IAutomovil } from 'src/automovil/interface/automovil.interface';
import { ClienteEntity } from 'src/persistence/entities';

export interface Venta {
  id: string;
  auto: IAutomovil;
  cliente?: ClienteEntity | null;
}
