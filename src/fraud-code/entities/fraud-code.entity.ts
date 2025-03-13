import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fraud_codes')
export class FraudCodeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column()
  createdDate: string;

  @Column({ default: null })
  usedDate: string;
}
