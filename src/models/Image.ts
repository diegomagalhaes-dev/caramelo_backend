import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import CollectPoint from "./CollectPoint";

@Entity("animals")
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @OneToOne(() => CollectPoint, (collectpoint) => collectpoint.image)
  @JoinColumn({ name: "collect-point_id" })
  collectpoint: CollectPoint;
}
