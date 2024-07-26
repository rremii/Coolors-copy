import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { IUser } from "../users.interface"

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

  // @OneToMany(() => Account, (account) => account.user)
  // accounts: Account[]

  // @OneToMany(
  //   () => AccountHistoryPoint,
  //   (accountHistoryPoint) => accountHistoryPoint.user,
  // )
  // accountHistoryPoints: AccountHistoryPoint[]

  // @OneToMany(() => Category, (category) => category.user)
  // categories: Category[]

  // @OneToMany(() => Category, (category) => category.user)
  // transaction: Transaction[]
}
