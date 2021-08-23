import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddValidateFieldCollectPoints1629654866349
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "collect_points",
      new TableColumn({
        name: "validate",
        type: "boolean",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("collect_points", "validate");
  }
}
