import { IsNotEmpty, IsString } from 'class-validator';

export class ActualizarClienteDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
