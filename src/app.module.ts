import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { AutomovilModule } from './automovil/automovil.module';
import { VendedorModule } from './vendedor/vendedor.module';

@Module({
  imports: [ClienteModule, AutomovilModule, VendedorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
