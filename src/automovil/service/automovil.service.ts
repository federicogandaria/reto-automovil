import { Injectable, NotFoundException } from '@nestjs/common';
import { IAutomovil } from '../interface/automovil.interface';
import { AutomovilEntity } from '../../persistence/entities/automovil.entity';
import { v4 as uuid } from 'uuid';
import { BaseRepository } from 'src/persistence/repositories/base/base.repository';
import { AutomovilRepository } from 'src/persistence/repositories/base/repositories/automovil.repository';

@Injectable()
export class AutomovilService extends BaseRepository<IAutomovil> {
  constructor(private readonly automovilRepository: AutomovilRepository) {
    super();
  }

  crearAutomovil(automovil: AutomovilEntity): IAutomovil {
    automovil.id = uuid();
    const automovilConCliente = automovil.cliente
      ? {
          ...automovil,
          cliente: { ...automovil.cliente, automovil: undefined },
        }
      : automovil;
    const automovilConAuto = automovil.auto
      ? {
          ...automovilConCliente,
          auto: this.crearAutomovil(automovil.auto),
        }
      : automovilConCliente;
    const automovilConVendedor = {
      ...automovilConAuto,
      vendedor: { ...automovil.vendedor, autos: [] },
    };
    const automovilDTO: IAutomovil = {
      id: automovilConVendedor.id,
      marca: automovilConVendedor.marca,
      modelo: automovilConVendedor.modelo,
      año: automovilConVendedor.año,
      vendedor: automovilConVendedor.vendedor,
      cliente: automovilConVendedor.cliente,
    };
    this.db.push(automovilDTO);
    return automovilDTO;
  }
  obtenerAutomoviles(): IAutomovil[] {
    return this.db;
  }

  findOneById(id: string): AutomovilEntity {
    const currentAutomovil = this.automovilRepository.findOneById(id);
    if (!currentAutomovil) throw new NotFoundException();
    return currentAutomovil;
  }
}
