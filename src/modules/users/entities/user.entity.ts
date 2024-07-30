import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { IUser } from "../users.interface"
import { Palette } from "../../palette/entities/palette.entity"

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  colorHex: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  refreshToken: string

  @OneToMany(() => Palette, (palette) => palette.user)
  palettes: Palette[]
}
