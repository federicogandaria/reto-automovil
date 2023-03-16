import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ClienteEntity, VendedorEntity } from 'src/persistence/entities';

export class AutomovilDto {
  @IsString({ message: 'El ID debe ser una cadena de caracteres' })
  @IsOptional()
  id: string;

  @IsString({ message: 'La marca debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marca: string;

  @IsString({ message: 'El modelo debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @IsNumber({}, { message: 'El año debe ser un número' })
  @IsNotEmpty({ message: 'El año es obligatorio' })
  año: number;

  @IsOptional()
  @IsObject({ message: 'El cliente debe ser un objeto' })
  @ValidateNested({
    message: 'El objeto cliente debe ser una instancia válida de ClienteEntity',
  })
  @Type(() => ClienteEntity)
  cliente?: ClienteEntity;

  @IsOptional()
  @IsObject({ message: 'El vendedor debe ser un objeto' })
  @ValidateNested({
    message:
      'El objeto vendedor debe ser una instancia válida de VendedorEntity',
  })
  @Type(() => VendedorEntity)
  vendedor?: VendedorEntity;
}
