import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionImageUrl1769100693777 implements MigrationInterface {
  name = 'TransactionImageUrl1769100693777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`voucherImageUrl\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`voucherImageUrl\``,
    );
  }
}
