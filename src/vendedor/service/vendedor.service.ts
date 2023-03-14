import { Injectable, NotFoundException } from '@nestjs/common';
import { VendedorEntity } from 'src/persistence/entities';
import { BaseRepository } from 'src/persistence/repositories/base/base.repository';
import { v4 as uuid } from 'uuid';
import { IVendedor } from '../interface/vendedor.interface';

@Injectable()
export class VendedorService extends BaseRepository<IVendedor> {
  createVendedor(vendedorEntity: VendedorEntity): IVendedor {
    const id = uuid();
    const autos = vendedorEntity.autos.map((auto) => ({
      ...auto,
      id: uuid(),
      idVendedor: id, // guardar el id del vendedor que vendió el automóvil
    }));
    const vendedor: IVendedor = {
      id,
      nombre: vendedorEntity.nombre,
      autos,
    };
    this.db.push(vendedor);

    return vendedor;
  }

  getVendedores(): IVendedor[] {
    return this.db;
  }
  getVendedorById(id: string): IVendedor {
    const vendedor = this.db.find((v) => v.id === id);
    if (!vendedor) {
      throw new NotFoundException(`Vendedor con id ${id} no encontrado`);
    }
    return vendedor;
  }

  actualizarVendedor(id: string, vendedorEntity: VendedorEntity): IVendedor {
    const index = this.db.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `No se encontró ningún vendedor con el id ${id}`,
      );
    }

    const autos = vendedorEntity.autos.map((auto) => ({
      ...auto,
      id: auto.id ? auto.id : uuid(),
    }));
    const vendedor: IVendedor = {
      id,
      nombre: vendedorEntity.nombre,
      autos,
    };

    this.db[index] = vendedor;

    return vendedor;
  }
  deleteVendedor(id: string): void {
    const index = this.db.findIndex((v) => v.id === id);
    if (index >= 0) {
      this.db.splice(index, 1);
    }
  }
}
