import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileBirthdateUtc1769727035045 implements MigrationInterface {
  name = 'ProfileBirthdateUtc1769727035045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP COLUMN \`birthDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`birthDate\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` DROP COLUMN \`birthDate\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` ADD \`birthDate\` date NULL`,
    );
  }
}
