import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AutomovilEntity } from '../../persistence/entities/automovil.entity';

export class CrearClienteDto {
  @IsString({ message: 'El ID debe ser una cadena de caracteres' })
  @IsOptional()
  id: string;

  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(3, 15, { message: 'El nombre debe tener entre 3 y 15 caracteres' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @IsOptional()
  @IsObject({ message: 'El automóvil debe ser un objeto' })
  @ValidateNested({
    message:
      'El objeto automóvil debe ser una instancia válida de AutomovilEntity',
  })
  @Type(() => AutomovilEntity)
  automovil?: AutomovilEntity;

  cocheComprado: AutomovilEntity[];
}
