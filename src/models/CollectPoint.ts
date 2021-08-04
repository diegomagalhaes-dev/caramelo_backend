import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("collect_points")
export default class CollectPoint {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  latitude: number;
  @Column()
  longitude: number;

  @OneToOne(() => Image, (image) => image.collectpoint, {
    cascade: ["insert", "update"],
  })
  image: Image;
}
