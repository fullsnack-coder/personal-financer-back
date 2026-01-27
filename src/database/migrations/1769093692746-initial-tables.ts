import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1769093692746 implements MigrationInterface {
  name = 'InitialTables1769093692746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`coverImageUrl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`fund\` (\`id\` uuid NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`balance\` decimal(15,2) NOT NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`transaction\` (\`id\` uuid NOT NULL, \`amount\` decimal(15,2) NOT NULL, \`fund_id\` uuid NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`fund\` ADD CONSTRAINT \`FK_d050bcb3279e29b169702a087d2\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_1888c1b21792f7bbbafa7fd4bfe\` FOREIGN KEY (\`fund_id\`) REFERENCES \`fund\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_1888c1b21792f7bbbafa7fd4bfe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`fund\` DROP FOREIGN KEY \`FK_d050bcb3279e29b169702a087d2\``,
    );
    await queryRunner.query(`DROP TABLE \`transaction\``);
    await queryRunner.query(`DROP TABLE \`fund\``);
    await queryRunner.query(`DROP TABLE \`category\``);
  }
}
