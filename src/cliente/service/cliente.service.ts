import { Injectable, NotFoundException } from '@nestjs/common';
import { ClienteEntity } from '../../persistence/entities/cliente.entity';
import { ClienteRepository } from '../../persistence/repositories/base/repositories/cliente.repository';
import { ICliente } from '../interface/cliente.interface';
@Injectable()
export class ClienteService {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  crearCliente(cliente: ClienteEntity): ICliente {
    const clienteEntity = new ClienteEntity();
    clienteEntity.nombre = cliente.nombre;
    clienteEntity.automovil = cliente.automovil;
    const createdCliente = this.clienteRepository.register(clienteEntity);
    console.log(createdCliente);

    return {
      id: createdCliente.id,
      nombre: createdCliente.nombre,
      automovil: createdCliente.automovil,
    };
  }
  obtenerClientes(): ClienteEntity[] {
    return this.clienteRepository.findAll();
  }
  buscarClientePorId(id: string): ClienteEntity {
    return this.clienteRepository.findOneById(id);
  }
  actualizarCliente(id: string, cliente: ICliente): ClienteEntity {
    const clienteEntity = new ClienteEntity();
    clienteEntity.id = id;
    clienteEntity.nombre = cliente.nombre;
    clienteEntity.automovil = cliente.automovil;

    return this.clienteRepository.update(id, clienteEntity);
  }

  borrarCliente(id: string): string {
    const clienteEliminado = this.clienteRepository.delete(id);
    if (clienteEliminado) {
      return 'Cliente eliminado correctamente';
    }
    throw new NotFoundException('ID de cliente no encontrado');
  }
}
