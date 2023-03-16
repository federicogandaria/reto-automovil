import { IsNotEmpty, IsString } from 'class-validator';

export class CrearClienteDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
