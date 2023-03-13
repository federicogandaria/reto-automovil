import { Injectable, NotFoundException } from '@nestjs/common';
import { AutomovilEntity, VendedorEntity } from 'src/persistence/entities';
import { v4 as uuid } from 'uuid';
import { Vendedor } from '../interface/vendedor.interface';

@Injectable()
export class VendedorService {
  private readonly vendedores: Vendedor[] = [];
  private readonly ventas: AutomovilEntity[] = [];

  createVendedor(vendedorEntity: VendedorEntity): Vendedor {
    const id = uuid();
    const autos = vendedorEntity.autos.map((auto) => ({
      ...auto,
      id: uuid(),
      idVendedor: id, // guardar el id del vendedor que vendió el automóvil
    }));
    const vendedor: Vendedor = {
      id,
      nombre: vendedorEntity.nombre,
      autos,
    };
    this.vendedores.push(vendedor);

    return vendedor;
  }

  getVendedores(): Vendedor[] {
    return this.vendedores;
  }
  getVendedorById(id: string): Vendedor {
    const vendedor = this.vendedores.find((v) => v.id === id);
    if (!vendedor) {
      throw new NotFoundException(`Vendedor con id ${id} no encontrado`);
    }
    return vendedor;
  }

  actualizarVendedor(id: string, vendedorEntity: VendedorEntity): Vendedor {
    const index = this.vendedores.findIndex((v) => v.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `No se encontró ningún vendedor con el id ${id}`,
      );
    }

    const autos = vendedorEntity.autos.map((auto) => ({
      ...auto,
      id: auto.id ? auto.id : uuid(),
    }));
    const vendedor: Vendedor = {
      id,
      nombre: vendedorEntity.nombre,
      autos,
    };

    this.vendedores[index] = vendedor;

    return vendedor;
  }
  deleteVendedor(id: string): void {
    const index = this.vendedores.findIndex((v) => v.id === id);
    if (index >= 0) {
      this.vendedores.splice(index, 1);
    }
  }
}
