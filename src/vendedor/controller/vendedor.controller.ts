import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VendedorEntity } from 'src/persistence/entities';
import { VendedorService } from '../service/vendedor.service';
import { VendedorDto } from '../dto/vendedor.dto';
import { IVendedor } from '../interface/vendedor.interface';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @UsePipes(new ValidationPipe())
  @Post('crear')
  crearVendedor(@Body() vendedor: VendedorDto): IVendedor {
    return this.vendedorService.crearVendedor(vendedor);
  }

  @Get()
  obtenerVendedores(): IVendedor[] {
    return this.vendedorService.obtenerVendedores();
  }

  @Get(':id')
  obtenerVendedorPorId(@Param('id') id: string): VendedorEntity {
    const vendedor = this.vendedorService.buscarVendedorPorId(id);
    if (!vendedor) throw new NotFoundException('Elemento no encontrado');
    return vendedor;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  actualizarVendedor(
    @Param('id') id: string,
    @Body() automovil: VendedorDto,
  ): IVendedor {
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
