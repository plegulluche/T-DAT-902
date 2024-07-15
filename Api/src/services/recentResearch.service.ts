import { PrismaClient, RecentResearch } from '@prisma/client'

export class RecentResearchService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createRecentResearch(
    data: Omit<RecentResearch, 'id' | 'created_at' | 'updated_at'>
  ): Promise<RecentResearch> {
    return this.prisma.recentResearch.create({ data })
  }

  async getRecentResearchById(id: string): Promise<RecentResearch | null> {
    return this.prisma.recentResearch.findUnique({ where: { id } })
  }

  async updateRecentResearch(
    id: string,
    data: Partial<RecentResearch>
  ): Promise<RecentResearch | null> {
    return this.prisma.recentResearch.update({ where: { id }, data })
  }

  async deleteRecentResearch(id: string): Promise<RecentResearch | null> {
    return this.prisma.recentResearch.delete({ where: { id } })
  }

  async getRecentResearchByUserId(userId: string): Promise<RecentResearch[]> {
    return this.prisma.recentResearch.findMany({ where: { user_id: userId } })
  }
}
