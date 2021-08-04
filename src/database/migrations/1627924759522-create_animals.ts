import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAnimals1627924759522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animals",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "collect-point_id",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "ImageComedouro",
            columnNames: ["collect-point_id"],
            referencedTableName: "collect_points",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animals");
  }
}
