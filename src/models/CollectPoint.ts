import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import Image from "./Image";

@Entity("collect_points")
export default class CollectPoint {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  validate: boolean;

  @OneToOne(() => Image, (image) => image.collectpoint, {
    cascade: ["insert", "update"],
  })
  image: Image;
}
