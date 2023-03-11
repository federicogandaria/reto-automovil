import { Module } from '@nestjs/common';
import { AutomovilController } from './controller/automovil.controller';
import { AutomovilService } from './service/automovil.service';

@Module({
  controllers: [AutomovilController],
  providers: [AutomovilService],
})
export class AutomovilModule {}
