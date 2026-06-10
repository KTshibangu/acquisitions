import { z } from 'zod'

export const userIdSchema = z.object({
    id: z.coerce.number().int().positive()
})

export const updateUserSchema = z.object({
    name: z.string().min(2).max(255).trim().optional(),
    email: z.email().max(255).toLowerCase().trim().optional(),
    password: z.string().min(6).max(128).optional(),
    role: z.enum(['user', 'admin']).optional()
})
.strict() // reject unrecognised fields
.refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
})

export const userQuerySchema = z.object({
    role: z.enum(['user', 'admin']).optional(),
    search: z.string().max(255).trim().optional(),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    offset: z.coerce.number().int().min(0).default(0),
    sortBy: z.enum(['name', 'email', 'created_at', 'updated_at']).default('created_at'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
})