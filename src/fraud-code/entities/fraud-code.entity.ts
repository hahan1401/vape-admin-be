import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fraud_codes')
export class FraudCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  usedDate: Date;
}
