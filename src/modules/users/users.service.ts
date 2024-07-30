import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { HashData } from "../../common/helpers/hashData"
import { TokenService } from "../token/token.service"
import { IUserInfo } from "./users.interface"
import { ApiError } from "../../common/constants/errors"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly tokenService: TokenService,
  ) {}

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id })
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email })
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new User()

    newUser.colorHex = user.colorHex
    newUser.email = user.email
    newUser.name = user.name
    newUser.password = await HashData(user.password)

    return await newUser.save()

    //   await this.accountService.createDefaultAccounts(createdUser)
    //   await this.categoryService.createDefaultCategories(createdUser)
  }

  // async changeName({ newName, id }: ChangeNameDto): Promise<DefaultResponse> {
  //   const user = await this.usersRepository.findOneBy({ id })
  //   user.name = newName
  //
  //   await user.save()
  //
  //   return { message: "user name was updated" }
  // }

  // async changePassword({
  //   hashedPassword,
  //   id,
  // }: ChangePasswordDto): Promise<DefaultResponse> {
  //   const user = await this.usersRepository.findOneBy({ id })
  //   user.password = hashedPassword
  //
  //   await user.save()
  //
  //   return { message: "user password was updated" }
  // }

  // async changeAvatar(changeNameDto: ChangeAvatarDto): Promise<DefaultResponse> {
  //   const user = await this.usersRepository.findOneBy({ id: changeNameDto.id })
  //   user.avatar = changeNameDto.newAvatar
  //
  //   await user.save()
  //
  //   return { message: "user avatar was updated" }
  // }

  async getById(id) {
    return this.usersRepository.findOneBy({ id })
  }

  async getUser(authToken: string): Promise<IUserInfo> {
    const decodedUser = await this.tokenService.decodeToken(authToken)

    const user = this.usersRepository.findOne({
      where: { id: decodedUser.id },
      select: ["id", "email", "colorHex", "name"],
    })

    if (!user) throw new BadRequestException(ApiError.USER_NOT_FOUND)

    return user
  }
}
