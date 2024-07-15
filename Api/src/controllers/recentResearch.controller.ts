import { Request, Response } from 'express'
import { RecentResearchService } from '../services/recentResearch.service'

export class RecentResearchController {
  private recentResearchService: RecentResearchService

  constructor(recentResearchService: RecentResearchService) {
    this.recentResearchService = recentResearchService
  }

  async createRecentResearch(req: Request, res: Response): Promise<void> {
    try {
      const newRecentResearch =
        await this.recentResearchService.createRecentResearch(req.body)
      res.status(201).json(newRecentResearch)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getRecentResearchById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const recentResearch =
        await this.recentResearchService.getRecentResearchById(id)
      if (recentResearch) {
        res.json(recentResearch)
      } else {
        res.status(404).json({ error: 'Recent research not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async updateRecentResearch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updatedRecentResearch =
        await this.recentResearchService.updateRecentResearch(id, req.body)
      if (updatedRecentResearch) {
        res.json(updatedRecentResearch)
      } else {
        res.status(404).json({ error: 'Recent research not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async deleteRecentResearch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deletedRecentResearch =
        await this.recentResearchService.deleteRecentResearch(id)
      if (deletedRecentResearch) {
        res.json({ message: 'Recent research deleted successfully' })
      } else {
        res.status(404).json({ error: 'Recent research not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getRecentResearchByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params
      const recentResearches =
        await this.recentResearchService.getRecentResearchByUserId(userId)
      res.json(recentResearches)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
