import { fetchAllUsers } from '#controllers/users.controller.js'
import express from 'express'

const userRouter = express.Router()

userRouter.get('/', fetchAllUsers)
userRouter.get('/:id', (req, res) => res.send('GET /users/:id'))
userRouter.put('/:id', (req, res) => res.send('PUT /users/:id'))
userRouter.delete('/:id', (req, res) => res.send('DELETE /users/:ID'))

export default userRouter