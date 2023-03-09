import express, { Router } from 'express'
import { UserController } from './user.controller'

export const userRouter: Router = express.Router()

const userController = new UserController()

userRouter.post('/users', userController.createUser)
userRouter.get('/users', userController.getUsers)
userRouter.get('/users/:id', userController.getOneUser)
userRouter.put('/users/:id', userController.updateUser)
userRouter.delete('/users/:id', userController.deleteUser)