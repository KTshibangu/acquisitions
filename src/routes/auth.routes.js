import { signIn, signOut, signUp } from '#controllers/auth.controller.js';
import express from 'express'

const authrouter = express.Router();

authrouter.post('/sign-up', signUp)

authrouter.post('/sign-in', signIn)

authrouter.post('/sign-out', signOut)

export default authrouter;