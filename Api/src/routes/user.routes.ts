import express from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

let userController: UserController
;(async () => {
  const userService = new UserService()
  userController = new UserController(userService)
})()

router.post('/', (req, res) => userController.createUser(req, res))
router.put('/:id', (req, res) => userController.updateUser(req, res))
router.get('/:id', (req, res) => userController.getUserById(req, res))

export default router
