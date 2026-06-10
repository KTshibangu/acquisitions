import { db } from "#config/database.js"
import logger from "#config/logger.js"
import { users } from "#models/user.model.js"


export const getAllUsers = async () => {
    try {
        return await db.select({
            id: users.id,
            email: users.email,
            name: users.name,
            role: users.role,
            created_at: users.created_at,
            updated_at: users.updated_at
        }).from(users)

    } catch (error) {
        logger.error('Error getting users', error)
        throw error
    }
}

export const getUsersById = async (id) => {
    try {
        const [user] = await db.select({
            id: users.id,
            email: users.email,
            name: users.name,
            role: users.role,
            created_at: users.created_at,
            updated_at: users.updated_at
        }).from(users).where(eq(users.id, id)).limit(1)

        if (!user) {
            throw new Error('User not found!')
        }

        return user
    } catch (error) {
        logger.error('Error getting user by id', error)
        throw error
    }
}

export const updateUser = async (id, updates) => {
    try {
        const existingUser = await getUsersById(id);

        if (updates.email && updates.email !== existingUser.email) {
            const [emailExists] = await db.select().from(users).where(eq(users.email, updates.email)).limit(1)
            if (emailExists) {
                throw new Error('Email already exists')
            }
        }

        //Add updated_at timestamp
        const updatedData = {
            ...updates,
            updated_at: new Date()
        }

        const [updatedUser] = await db
            .update(users)
            .set(updatedData)
            .where(eq(users.id, id))
            .returning({
                id: users.id,
                email: users.email,
                name: users.name,
                role: users.role,
                created_at: users.created_at,
                updated_at: users.updated_at
            })

        return updatedUser
    } catch (error) {
        logger.error('Error updating user', error)
        throw error
    }
}

export const deleteUser = async (id) => {
    try {
        //check if user exists
        await getUsersById(id)

        const [deletedUser] = await db
            .delete(users)
            .where(eq(users.id, id))
            .returning({
                id: users.id,
                email: users.email,
                name: users.name,
                role: users.role,
                created_at: users.created_at,
                updated_at: users.updated_at
            })

        if (!deletedUser) {
            throw new Error('Failed to delete user')
        }

        return deletedUser
    } catch (error) {
        logger.error('Error deleting user', error)
        throw error
    }
}