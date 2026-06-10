import express from 'express'
import { deleteUserById, fetchAllUsers, fetchUsersById, updateUserById } from '#controllers/users.controller.js'
import { authenticateToken, requiredRole } from '#middleware/auth.middleware.js'


const userRouter = express.Router()

//GET /users - Get All users (Admin)
userRouter.get('/', authenticateToken, requiredRole(['admin']) ,fetchAllUsers)

//GET /users/:id - Get user by ID (authenticated users only)
userRouter.get('/:id', authenticateToken, fetchUsersById)

//PUT /users/:id - Update user by ID (authenticated users can update own profile, admin can update any)
userRouter.put('/:id', authenticateToken, updateUserById)

//DELETE /users/:id - Delete user by ID (Admin)
userRouter.delete('/:id', authenticateToken, requiredRole(['admin']), deleteUserById)

export default userRouter