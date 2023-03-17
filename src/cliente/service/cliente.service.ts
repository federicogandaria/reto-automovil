import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClienteEntity } from '../../persistence/entities/cliente.entity';
import { ClienteRepository } from '../../persistence/repositories/base/repositories/cliente.repository';
import { ICliente } from '../interface/cliente.interface';
import { CrearClienteDto } from '../dto/crearCliente.dto';
import { ActualizarClienteDto } from '../dto/actualizarCliente.dto';
import { VendedorRepository } from 'src/persistence/repositories/base/repositories/vendedor.repository';
import { AutomovilRepository } from 'src/persistence/repositories/base/repositories/automovil.repository';
import { VendedorEntity } from 'src/persistence/entities';
@Injectable()
export class ClienteService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly vendedorRepository: VendedorRepository,
    private readonly automovilRepository: AutomovilRepository,
  ) {}

  crearCliente(cliente: CrearClienteDto): ICliente {
    const clienteEntity = new ClienteEntity({
      nombre: cliente.nombre,
      automovil: cliente.automovil,
      cocheComprado: cliente.cocheComprado,
    });
    const createdCliente = this.clienteRepository.register(clienteEntity);
    console.log(createdCliente);

    return {
      id: createdCliente.id,
      nombre: createdCliente.nombre,
      automovil: createdCliente.automovil,
      cocheComprado: createdCliente.cocheComprado,
    };
  }

  obtenerClientes(): ClienteEntity[] {
    return this.clienteRepository.findAll();
  }
  buscarClientePorId(id: string): ClienteEntity {
    return this.clienteRepository.findOneById(id);
  }
  actualizarCliente(id: string, cliente: ActualizarClienteDto): ICliente {
    const clienteEntity = new ClienteEntity({
      nombre: cliente.nombre,
      automovil: cliente.automovil,
      cocheComprado: cliente.cocheComprado,
    });

    return this.clienteRepository.update(id, clienteEntity);
  }

  borrarCliente(id: string): string {
    const clienteEliminado = this.clienteRepository.delete(id);
    if (clienteEliminado) {
      return 'Cliente eliminado correctamente';
    }
    throw new NotFoundException('ID de cliente no encontrado');
  }
  buscarVendedorPorIdDeCoche(idCoche: string): VendedorEntity {
    const cliente = this.clienteRepository.findByAutomovil(idCoche);
    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado para el coche especificado',
      );
    }
    const vendedor = this.vendedorRepository.findOneById(
      cliente.vendedorId ?? '',
    );
    if (!vendedor) {
      throw new NotFoundException('Vendedor no encontrado');
    }
    return vendedor;
  }
  asignarAutoComprado(
    idCliente: string,
    idAuto: string,
    idVendedor: string,
  ): ICliente {
    // Obtener el cliente existente
    const cliente = this.clienteRepository.findOneById(idCliente);
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${idCliente} no encontrado`);
    }

    // Obtener el auto vendido existente y su vendedor
    const auto = this.automovilRepository.findOneById(idAuto);
    if (!auto) {
      throw new NotFoundException(`Auto con id ${idAuto} no encontrado`);
    }
    const vendedor = auto.vendedor;
    if (!vendedor || vendedor.id !== idVendedor) {
      throw new BadRequestException(
        `Auto con id ${idAuto} no vendido por el vendedor con id ${idVendedor}`,
      );
    }

    // Asignar el auto comprado al cliente
    cliente.cocheComprado = [auto];

    // Actualizar el registro del cliente en la base de datos
    const clienteActualizado = this.clienteRepository.update(
      idCliente,
      cliente,
    );

    // Retornar el cliente actualizado
    return clienteActualizado;
  }
}
