import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("admin")
export default class Admin {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
