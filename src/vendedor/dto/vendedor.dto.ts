import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { AutomovilDto } from 'src/automovil/dto/automovil.dto';

export class VendedorDto {
  @IsString({ message: 'El ID debe ser una cadena de caracteres' })
  @IsOptional()
  id: string;

  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(3, 15, { message: 'El nombre debe tener entre 3 y 15 caracteres' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsOptional()
  @IsArray({
    message: 'Los autos deben ser proporcionados como una matriz de objetos',
  })
  @ValidateNested({
    each: true,
    message:
      'Cada objeto de la matriz de autos debe ser una instancia válida de AutomovilDto',
  })
  @Type(() => AutomovilDto)
  autos?: AutomovilDto[];
}
