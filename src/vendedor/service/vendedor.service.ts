import { Injectable, NotFoundException } from '@nestjs/common';
import { VendedorRepository } from 'src/persistence/repositories/base/repositories/vendedor.repository';
import { VendedorEntity } from '../../persistence/entities/vendedor.entity';
import { IVendedor } from '../interface/vendedor.interface';
import { VendedorDto } from '../dto/vendedor.dto';
@Injectable()
export class VendedorService {
  constructor(private readonly vendedorRepository: VendedorRepository) {}

  crearVendedor(vendedor: VendedorDto): IVendedor {
    const vendedorEntity = new VendedorEntity();
    vendedorEntity.nombre = vendedor.nombre;
    vendedorEntity.autos = vendedor.autos;

    const createdVendedor = this.vendedorRepository.register(vendedorEntity);
    console.log(createdVendedor);

    return {
      id: createdVendedor.id,
      nombre: createdVendedor.nombre,
      autos: createdVendedor.autos,
    };
  }
  obtenerVendedores(): IVendedor[] {
    return this.vendedorRepository.findAll();
  }
  buscarVendedorPorId(id: string): IVendedor {
    return this.vendedorRepository.findOneById(id);
  }
  actualizarVendedor(id: string, vendedor: VendedorDto): IVendedor {
    const vendedorEntity = new VendedorEntity();
    vendedorEntity.id = id;
    vendedorEntity.nombre = vendedor.nombre;
    vendedorEntity.autos = vendedor.autos;

    return this.vendedorRepository.update(id, vendedorEntity);
  }

  borrarVendedor(id: string): string {
    const vendedorEliminado = this.vendedorRepository.delete(id);
    if (vendedorEliminado) {
      return 'Vendedor eliminado correctamente';
    }
    throw new NotFoundException('ID de vendedor no encontrado');
  }
}
