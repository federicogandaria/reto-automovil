import { Module } from '@nestjs/common';
import { AutomovilModule } from './automovil/automovil.module';
import { VendedorModule } from './vendedor/vendedor.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [AutomovilModule, VendedorModule, ClienteModule],
})
export class AppModule {}
