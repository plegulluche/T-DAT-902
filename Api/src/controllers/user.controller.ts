import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      console.log("Création d'utilisateur - Données reçues:", req.body)
      const { firebase_id, email } = req.body
      if (!firebase_id || !email) {
        console.log('Données manquantes')
        res.status(400).json({ error: 'Firebase ID and email are required' })
        return
      }
      console.log("Appel du service pour créer l'utilisateur")
      const newUser = await this.userService.createUser(firebase_id, email)
      console.log('Utilisateur créé:', newUser)
      res.status(201).json(newUser)
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const updateData = req.body
      const updatedUser = await this.userService.updateUser(id, updateData)
      if (updatedUser) {
        res.json(updatedUser)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)
      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
