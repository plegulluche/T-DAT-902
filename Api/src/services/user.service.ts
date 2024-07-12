import { PrismaClient, User } from '@prisma/client'

export class UserService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createUser(firebase_id: string, email: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        firebase_id,
        email
      }
    })
  }

  async updateUser(
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: updateData
    })
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  async getUserByFirebaseId(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { firebase_id: id},
    })
}

}