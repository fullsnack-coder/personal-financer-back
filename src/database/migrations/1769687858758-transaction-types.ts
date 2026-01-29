import { MigrationInterface, QueryRunner } from 'typeorm';

export class TransactionTypes1769687858758 implements MigrationInterface {
  name = 'TransactionTypes1769687858758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`transaction_type\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`typeName\` enum ('INCOME', 'EXPENSE') NOT NULL DEFAULT 'EXPENSE', \`sign\` int NOT NULL DEFAULT '1', UNIQUE INDEX \`IDX_58f4ab309864a1da56898ebdc9\` (\`typeName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`currencyCode\` varchar(3) NOT NULL DEFAULT 'USD'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD \`transactionTypeId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_0e57c323890648df9aa92e57a34\` FOREIGN KEY (\`transactionTypeId\`) REFERENCES \`transaction_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_0e57c323890648df9aa92e57a34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`transactionTypeId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP COLUMN \`currencyCode\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_58f4ab309864a1da56898ebdc9\` ON \`transaction_type\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction_type\``);
  }
}
