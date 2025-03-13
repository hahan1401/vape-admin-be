import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FraudCodeEntity } from './entities/fraud-code.entity';
import { FraudCodeController } from './fraud-code.controller';
import { FraudCodeService } from './fraud-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([FraudCodeEntity])],
  controllers: [FraudCodeController],
  providers: [FraudCodeService],
})
export class FraudCodeModule {}
