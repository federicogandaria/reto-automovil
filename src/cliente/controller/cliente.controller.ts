import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteEntity } from 'src/persistence/entities';
import { ClienteService } from '../service/cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('crear')
  crearCliente(@Body() cliente: ClienteEntity): ClienteEntity {
    return this.clienteService.crearCliente(cliente);
  }

  @Get()
  obtenerClientes(): ClienteEntity[] {
    return this.clienteService.obtenerClientes();
  }

  @Get(':id')
  obtenerClientePorId(@Param('id') id: string): ClienteEntity {
    const cliente = this.clienteService.buscarClientePorId(id);
    if (!cliente) throw new NotFoundException('Elemento no encontrado');
    return cliente;
  }

  @Put(':id')
  actualizarCliente(
    @Param('id') id: string,
    @Body() cliente: ClienteEntity,
  ): ClienteEntity {
    const clientesActualizados = this.clienteService.actualizarCliente(
      id,
      cliente,
    );
    if (!clientesActualizados)
      throw new NotFoundException('Elemento no encontrado');
    return clientesActualizados;
  }

  @Delete(':id')
  eliminarCliente(@Param('id') id: string): string {
    const mensaje = this.clienteService.borrarCliente(id);
    if (mensaje === 'ID de cliente no encontrado') {
      throw new NotFoundException(mensaje);
    }
    return 'Cliente eliminado correctamente';
  }
}
