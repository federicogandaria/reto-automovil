import { Module } from '@nestjs/common';
import { AutomovilRepository } from 'src/persistence/repositories/base/repositories/automovil.repository';
import { AutomovilController } from './controller/automovil.controller';
import { AutomovilService } from './service/automovil.service';

@Module({
  controllers: [AutomovilController],
  providers: [AutomovilService, AutomovilRepository],
})
export class AutomovilModule {}
