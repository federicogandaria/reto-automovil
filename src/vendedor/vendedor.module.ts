import { Module } from '@nestjs/common';
import { VendedorRepository } from 'src/persistence/repositories/base/repositories/vendedor.repository';
import { VendedorController } from './controller/vendedor.controller';
import { VendedorService } from './service/vendedor.service';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService, VendedorRepository],
})
export class VendedorModule {}
