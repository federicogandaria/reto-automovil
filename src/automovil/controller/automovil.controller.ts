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
import { AutomovilEntity } from 'src/persistence/entities';
import { AutomovilService } from '../service/automovil.service';
import { AutomovilDto } from '../dto/automovil.dto';
import { IAutomovil } from '../interface/automovil.interface';

@Controller('automovil')
export class AutomovilController {
  constructor(private readonly automovilService: AutomovilService) {}

  @UsePipes(new ValidationPipe())
  @Post('crear')
  crearAutomovil(@Body() automovil: AutomovilDto): IAutomovil {
    return this.automovilService.crearAutomovil(automovil);
  }

  @Get()
  obtenerAutomoviles(): AutomovilEntity[] {
    return this.automovilService.obtenerAutomoviles();
  }

  @Get(':id')
  obtenerAutomovilPorId(@Param('id') id: string): AutomovilEntity {
    const automovil = this.automovilService.buscarAutomovilPorId(id);
    if (!automovil) throw new NotFoundException('Elemento no encontrado');
    return automovil;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  actualizarAutomovil(
    @Param('id') id: string,
    @Body() automovil: AutomovilDto,
  ): IAutomovil {
    const automovilActualizado = this.automovilService.actualizarAutomovil(
      id,
      automovil,
    );
    if (!automovilActualizado)
      throw new NotFoundException('Elemento no encontrado');
    return automovilActualizado;
  }

  @Delete(':id')
  eliminarAutomovil(@Param('id') id: string): string {
    const mensaje = this.automovilService.borrarAutomovil(id);
    if (mensaje === 'ID de automóvil no encontrado') {
      throw new NotFoundException(mensaje);
    }
    return 'Automóvil eliminado correctamente';
  }
}
