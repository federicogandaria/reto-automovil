import { Injectable, NotFoundException } from '@nestjs/common';
import { AutomovilEntity } from 'src/persistence/entities';
import { AutomovilRepository } from 'src/persistence/repositories/base/repositories/automovil.repository';
import { IAutomovil } from '../interface/automovil.interface';
import { AutomovilDto } from '../dto/automovil.dto';
@Injectable()
export class AutomovilService {
  constructor(private readonly automovilRepository: AutomovilRepository) {}

  crearAutomovil(automovil: AutomovilDto): IAutomovil {
    const automovilEntity = new AutomovilEntity();
    automovilEntity.marca = automovil.marca;
    automovilEntity.modelo = automovil.modelo;
    automovilEntity.año = automovil.año;
    automovilEntity.vendedor = automovil.vendedor;
    automovilEntity.cliente = automovil.cliente;

    const createdAutomovil = this.automovilRepository.register(automovilEntity);
    console.log(createdAutomovil);

    return {
      id: createdAutomovil.id,
      marca: createdAutomovil.marca,
      modelo: createdAutomovil.modelo,
      año: createdAutomovil.año,
      vendedor: createdAutomovil.vendedor,
      cliente: createdAutomovil.cliente,
    };
  }
  obtenerAutomoviles(): AutomovilEntity[] {
    return this.automovilRepository.findAll();
  }
  buscarAutomovilPorId(id: string): AutomovilEntity {
    return this.automovilRepository.findOneById(id);
  }
  actualizarAutomovil(id: string, automovil: AutomovilDto): AutomovilEntity {
    const automovilEntity = new AutomovilEntity();
    automovilEntity.id = id;
    automovilEntity.marca = automovil.marca;
    automovilEntity.modelo = automovil.modelo;
    automovilEntity.año = automovil.año;
    automovilEntity.vendedor = automovil.vendedor;
    automovilEntity.cliente = automovil.cliente;
    return this.automovilRepository.update(id, automovilEntity);
  }

  borrarAutomovil(id: string): string {
    const automovilEliminado = this.automovilRepository.delete(id);
    if (automovilEliminado) {
      return 'Automóvil eliminado correctamente';
    }
    throw new NotFoundException('ID de automóvil no encontrado');
  }
}
