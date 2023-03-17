import { Module } from '@nestjs/common';
import { ClienteController } from './controller/cliente.controller';
import { ClienteService } from './service/cliente.service';
import { ClienteRepository } from '../persistence/repositories/base/repositories/cliente.repository';
import { VendedorRepository } from '../persistence/repositories/base/repositories/vendedor.repository';
import { AutomovilRepository } from '../persistence/repositories/base/repositories/automovil.repository';

@Module({
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ClienteRepository,
    VendedorRepository,
    AutomovilRepository,
  ],
})
export class ClienteModule {}
