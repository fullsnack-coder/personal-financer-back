import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfilePreferences1771903482425 implements MigrationInterface {
  name = 'ProfilePreferences1771903482425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`profile_preferences\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`preferenceKey\` varchar(255) NOT NULL, \`preferenceValue\` varchar(255) NOT NULL, \`userId\` uuid NOT NULL, PRIMARY KEY (\`id\`, \`preferenceKey\`, \`preferenceValue\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile_preferences\` ADD CONSTRAINT \`FK_6c47582d79921eb26a1bb5da3dd\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profile_preferences\` DROP FOREIGN KEY \`FK_6c47582d79921eb26a1bb5da3dd\``,
    );
    await queryRunner.query(`DROP TABLE \`profile_preferences\``);
  }
}
