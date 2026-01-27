import { MigrationInterface, QueryRunner } from 'typeorm';

export class FundWithOptionalDescription1769357198780
  implements MigrationInterface
{
  name = 'FundWithOptionalDescription1769357198780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`fund\` CHANGE \`description\` \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE \`fund\` SET \`description\` = '' WHERE \`description\` IS NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE \`fund\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`,
    );
  }
}
