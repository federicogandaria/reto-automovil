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
import { VendedorEntity } from 'src/persistence/entities';
import { VendedorService } from '../service/vendedor.service';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Post('crear')
  crearVendedor(@Body() vendedor: VendedorEntity): VendedorEntity {
    return this.vendedorService.crearVendedor(vendedor);
  }

  @Get()
  obtenerVendedores(): VendedorEntity[] {
    return this.vendedorService.obtenerVendedores();
  }

  @Get(':id')
  obtenerVendedorPorId(@Param('id') id: string): VendedorEntity {
    const vendedor = this.vendedorService.buscarVendedorPorId(id);
    if (!vendedor) throw new NotFoundException('Elemento no encontrado');
    return vendedor;
  }

  @Put(':id')
  actualizarVendedor(
    @Param('id') id: string,
    @Body() automovil: VendedorEntity,
  ): VendedorEntity {
    const vendedorActualizado = this.vendedorService.actualizarVendedor(
      id,
      automovil,
    );
    if (!vendedorActualizado)
      throw new NotFoundException('Elemento no encontrado');
    return vendedorActualizado;
  }

  @Delete(':id')
  eliminarVendedor(@Param('id') id: string): string {
    const mensaje = this.vendedorService.borrarVendedor(id);
    if (mensaje === 'ID de vendedor no encontrado') {
      throw new NotFoundException(mensaje);
    }
    return 'Vendedor eliminado correctamente';
  }
}
