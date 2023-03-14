import { Module } from '@nestjs/common';
import { AutomovilModule } from './automovil/automovil.module';
import { VendedorModule } from './vendedor/vendedor.module';

@Module({
  imports: [AutomovilModule, VendedorModule],
})
export class AppModule {}
