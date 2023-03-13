import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { VendedorEntity } from 'src/persistence/entities';
import { Vendedor } from '../interface/vendedor.interface';
import { VendedorService } from '../service/vendedor.service';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}

  @Post('crear')
  create(@Body() vendedorEntity: VendedorEntity): Vendedor {
    return this.vendedorService.createVendedor(vendedorEntity);
  }

  @Get()
  findAll(): Vendedor[] {
    return this.vendedorService.getVendedores();
  }
  @Get(':id')
  getVendedorById(@Param('id') id: string): Vendedor {
    const vendedor = this.vendedorService.getVendedorById(id);
    if (!vendedor) {
      throw new NotFoundException(`No se encontró un vendedor con id ${id}`);
    }
    return vendedor;
  }
  @Put(':id')
  actualizarVendedor(
    @Param('id') id: string,
    @Body() vendedorEntity: VendedorEntity,
  ): Vendedor {
    const vendedor = this.vendedorService.actualizarVendedor(
      id,
      vendedorEntity,
    );
    if (!vendedor) {
      throw new NotFoundException(
        `No se encontró ningún vendedor con el id ${id}`,
      );
    }
    return vendedor;
  }
  @Delete(':id')
  deleteVendedor(@Param('id') id: string): void {
    return this.vendedorService.deleteVendedor(id);
  }
}
