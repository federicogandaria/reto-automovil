import { Module } from '@nestjs/common';
import { VendedorController } from './controller/vendedor.controller';
import { VendedorService } from './service/vendedor.service';

@Module({
  controllers: [VendedorController],
  providers: [VendedorService]
})
export class VendedorModule {}
