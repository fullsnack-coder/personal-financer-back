import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfileAvatar1770067615450 implements MigrationInterface {
    name = 'ProfileAvatar1770067615450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`avatar_group\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`groupName\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`profile_avatar\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`groupId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD \`profileAvatarId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`profile_avatar\` ADD CONSTRAINT \`FK_5e1f2f39d6b92a1db5d1d85da4c\` FOREIGN KEY (\`groupId\`) REFERENCES \`avatar_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_profile\` ADD CONSTRAINT \`FK_805d6fb738fd2b3505959cd3d0a\` FOREIGN KEY (\`profileAvatarId\`) REFERENCES \`profile_avatar\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP FOREIGN KEY \`FK_805d6fb738fd2b3505959cd3d0a\``);
        await queryRunner.query(`ALTER TABLE \`profile_avatar\` DROP FOREIGN KEY \`FK_5e1f2f39d6b92a1db5d1d85da4c\``);
        await queryRunner.query(`ALTER TABLE \`user_profile\` DROP COLUMN \`profileAvatarId\``);
        await queryRunner.query(`DROP TABLE \`profile_avatar\``);
        await queryRunner.query(`DROP TABLE \`avatar_group\``);
    }

}
