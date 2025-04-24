import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FraudCodeEntity } from './entities/fraud-code.entity';
import { FraudCodeService } from './fraud-code.service';

@Controller('fraud-code')
export class FraudCodeController {
  constructor(private readonly fraudCodeService: FraudCodeService) {}

  @Post('/check-duplicated')
  async checkDuplicatedcodes(@Body() codes: FraudCodeEntity[]) {
    return this.fraudCodeService.checkDuplicatedCodes(codes);
  }

  @Post('/import')
  async create(@Body() codes: FraudCodeEntity[]) {
    return this.fraudCodeService.importCodes(codes);
  }

  @Get('/find-by-value/:value')
  async getByValue(@Param('value') value: string) {
    const data = await this.fraudCodeService.getByValue(value);
    return { responseData: data };
  }

  @Put('/')
  async update(@Body() code: FraudCodeEntity) {
    const data = await this.fraudCodeService.update(code);
    return { responseData: data };
  }
}
