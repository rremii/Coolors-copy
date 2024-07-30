import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { IPalette } from "../palette.interface"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Palette extends BaseEntity implements IPalette {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  colors: string

  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.palettes)
  user: User
}
