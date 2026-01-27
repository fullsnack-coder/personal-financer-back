import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFunds1769270552518 implements MigrationInterface {
  name = 'UserFunds1769270552518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`fund\` ADD \`user_id\` uuid NULL`);
    await queryRunner.query(
      `ALTER TABLE \`fund\` ADD CONSTRAINT \`FK_17204a29a22830c999f7a4466cd\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`fund\` DROP FOREIGN KEY \`FK_17204a29a22830c999f7a4466cd\``,
    );
    await queryRunner.query(`ALTER TABLE \`fund\` DROP COLUMN \`user_id\``);
  }
}
