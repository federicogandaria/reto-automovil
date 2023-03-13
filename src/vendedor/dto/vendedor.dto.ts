import { AutomovilDto } from 'src/automovil/dto/automovil.dto';
import { IAutomovil } from 'src/automovil/interface/automovil.interface';

export class VendedorDto {
  id: string;
  nombre: string;
  autos?: AutomovilDto[];
  cochesVendidos: IAutomovil[];
}
