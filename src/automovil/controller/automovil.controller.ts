import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutomovilEntity } from 'src/persistence/entities';
import { IAutomovil } from '../interface/automovil.interface';
import { AutomovilService } from '../service/automovil.service';

@Controller('automovil')
export class AutomovilController {
  constructor(private readonly automovilService: AutomovilService) {}

  @Post('crear')
  crearAutomovil(@Body() automovil: AutomovilEntity): IAutomovil {
    return this.automovilService.crearAutomovil(automovil);
  }
  @Get()
  obtenerAutomoviles(): IAutomovil[] {
    return this.automovilService.obtenerAutomoviles();
  }
}
