import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCollectionPoint1627870762056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "collect_points",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "latitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
          {
            name: "longitude",
            type: "decimal",
            scale: 10,
            precision: 2,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("collect_points");
  }
}
