import { Module } from '@nestjs/common';
import { ClienteController } from './controller/cliente.controller';
import { ClienteService } from './service/cliente.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
