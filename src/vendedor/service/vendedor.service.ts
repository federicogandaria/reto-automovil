import { Injectable, NotFoundException } from '@nestjs/common';
import { VendedorRepository } from 'src/persistence/repositories/base/repositories/vendedor.repository';
import { VendedorEntity } from '../../persistence/entities/vendedor.entity';
import { IVendedor } from '../interface/vendedor.interface';
import { VendedorDto } from '../dto/vendedor.dto';
import { IAutomovil } from 'src/automovil/interface/automovil.interface';
import { AutomovilEntity } from 'src/persistence/entities';
import { v4 as uuid } from 'uuid';
@Injectable()
export class VendedorService {
  constructor(private readonly vendedorRepository: VendedorRepository) {}

  crearVendedor(vendedor: VendedorDto): IVendedor {
    const vendedorEntity = new VendedorEntity();
    vendedorEntity.nombre = vendedor.nombre;
    vendedorEntity.cochesVendidos = vendedor.cochesVendidos;

    const createdVendedor = this.vendedorRepository.register(vendedorEntity);
    console.log(createdVendedor);

    return {
      id: createdVendedor.id,
      nombre: createdVendedor.nombre,
      cochesVendidos: createdVendedor.cochesVendidos,
    };
  }
  obtenerVendedores(): IVendedor[] {
    const vendedores = this.vendedorRepository.findAll();
    const respuesta: IVendedor[] = [];

    vendedores.forEach((vendedor) => {
      respuesta.push({
        id: vendedor.id,
        nombre: vendedor.nombre,
        cochesVendidos: vendedor.cochesVendidos,
      });
    });

    return respuesta;
  }

  buscarVendedorPorId(id: string): IVendedor {
    return this.vendedorRepository.findOneById(id);
  }
  actualizarVendedor(id: string, vendedor: VendedorDto): IVendedor {
    const vendedorEntity = new VendedorEntity();
    vendedorEntity.id = id;
    vendedorEntity.nombre = vendedor.nombre;
    vendedorEntity.cochesVendidos = vendedor.cochesVendidos;

    return this.vendedorRepository.update(id, vendedorEntity);
  }

  borrarVendedor(id: string): string {
    const vendedorEliminado = this.vendedorRepository.delete(id);
    if (vendedorEliminado) {
      return 'Vendedor eliminado correctamente';
    }
    throw new NotFoundException('ID de vendedor no encontrado');
  }
  buscarAutosVendidosPorVendedor(id: string): IAutomovil[] {
    const vendedor = this.vendedorRepository.findOneById(id);

    if (!vendedor) {
      throw new NotFoundException(
        `No se encontró un vendedor con el ID '${id}'.`,
      );
    }

    const autosVendidos = vendedor.cochesVendidos?.filter(
      (auto) => auto.cliente !== undefined,
    );

    if (!autosVendidos || autosVendidos.length === 0) {
      return [];
    }

    return autosVendidos.map((auto) => {
      return {
        id: auto.id,
        marca: auto.marca,
        modelo: auto.modelo,
        año: auto.año,
        vendedor: auto.vendedor,
        cliente: auto.cliente,
      };
    });
  }
  agregarAutoVendido(
    idVendedor: string,
    automovil: AutomovilEntity,
  ): IVendedor {
    const vendedor = this.buscarVendedorPorId(idVendedor);
    if (!vendedor) {
      throw new NotFoundException('Vendedor no encontrado');
    }
    if (!vendedor.cochesVendidos) {
      vendedor.cochesVendidos = [];
    }
    automovil.id = uuid(); // Asignamos el UUID al automóvil vendido
    vendedor.cochesVendidos.push(automovil);
    return vendedor;
  }

  borrarAutoVendido(idVendedor: string, idAutoVendido: string): string {
    const vendedor = this.buscarVendedorPorId(idVendedor);
    if (!vendedor) {
      throw new NotFoundException('Vendedor no encontrado');
    }
    if (!vendedor.cochesVendidos) {
      throw new NotFoundException('No hay autos vendidos para este vendedor');
    }
    const autoVendido = vendedor.cochesVendidos.find(
      (auto) => auto.id === idAutoVendido,
    );
    if (!autoVendido) {
      throw new NotFoundException('Auto vendido no encontrado');
    }
    vendedor.cochesVendidos = vendedor.cochesVendidos.filter(
      (auto) => auto.id !== idAutoVendido,
    );
    return 'Auto vendido eliminado correctamente';
  }
}
