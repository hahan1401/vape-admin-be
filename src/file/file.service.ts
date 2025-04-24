import { Injectable } from '@nestjs/common';
import { FraudCodeEntity } from 'src/fraud-code/entities/fraud-code.entity';
import { FraudCodeIncsvFile } from 'src/types';
import { csvToJson } from 'src/utils/csv';

@Injectable()
export class FileService {
  async convertToCsv(
    file: Express.Multer.File,
  ): Promise<{ responseData: FraudCodeEntity[] }> {
    const csvFile = file.buffer.toString('utf8');
    const data = csvToJson<FraudCodeIncsvFile>(csvFile);
    return {
      responseData: data.map(
        (item) =>
          ({
            value: item.value,
          }) as FraudCodeEntity,
      ),
    };
  }
}
