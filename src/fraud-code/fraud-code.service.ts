import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { splitArray } from 'src/utils/common';
import { In, Repository } from 'typeorm';
import { FraudCodeEntity } from './entities/fraud-code.entity';

@Injectable()
export class FraudCodeService {
  @InjectRepository(FraudCodeEntity)
  private readonly fraudCodeRepository: Repository<FraudCodeEntity>;

  async importCodes(codes: FraudCodeEntity[]): Promise<FraudCodeEntity[]> {
    const createdEntities = this.fraudCodeRepository.create(codes);
    const savedEntities = await this.fraudCodeRepository.save(createdEntities);
    return savedEntities;
  }

  async checkDuplicatedCodes(codes: FraudCodeEntity[]): Promise<{
    duplicated: FraudCodeEntity[];
    nonDuplicated: FraudCodeEntity[];
  }> {
    const duplicated: FraudCodeEntity[] = [];
    const nonDuplicated: FraudCodeEntity[] = [];

    const batches = splitArray(codes, 10000);

    const results = await Promise.allSettled(
      batches.map(async (batch) => {
        const values = batch.map((item) => item.value);
        const existingCodes = await this.fraudCodeRepository.find({
          where: { value: In(values) },
        });

        const existingValues = new Set(existingCodes.map((code) => code.value));
        const codeNonDuplicated = batch.filter(
          (code) => !existingValues.has(code.value),
        );
        const codeDuplicated = batch.filter((code) =>
          existingValues.has(code.value),
        );

        return { codeNonDuplicated, codeDuplicated };
      }),
    );

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        nonDuplicated.push(...result.value.codeNonDuplicated);
        duplicated.push(...result.value.codeDuplicated);
      } else {
        console.error('Error processing batch:', result.reason);
      }
    });

    return { duplicated, nonDuplicated };
  }

  async getByValue(
    value: string,
  ): Promise<{ responseData: FraudCodeEntity | null }> {
    const code = await this.fraudCodeRepository.findOne({
      where: { value: value },
    });
    return { responseData: code };
  }

  async update(
    newCode: FraudCodeEntity,
  ): Promise<{ responseData: FraudCodeEntity | undefined }> {
    const code = (await this.getByValue(newCode.value)).responseData;
    if (code) {
      const _newCode = this.fraudCodeRepository.merge(code, newCode);
      return { responseData: await this.fraudCodeRepository.save(_newCode) };
    }
    return { responseData: undefined };
  }
}
