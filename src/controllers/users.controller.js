import logger from "#config/logger.js"
import { users } from "#models/user.model.js"
import { getAllUsers } from "#services/users.services.js"


export const fetchAllUsers = async (req, res, next) => {
    try {
        logger.info('Getting users...')
        const allUsers = await getAllUsers()

        res.json({
            message: 'Successfully retrieved users',
            users: allUsers,
            count: allUsers.length
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}