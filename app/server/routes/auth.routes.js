const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controllers.js')

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Auth management
 * paths:
 *   /auth/register:
 *     post:
 *       tags:
 *         - Auth
 *       requestBody:
 *         description: Register new user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInput'
 *       responses:
 *         200:
 *           description: Register successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         409:
 *           description: Email has already existed
 *           content:
 *             application/json:
 *               example: Email has already existed
 *         400:
 *           description: There was an error during account creation, please try again.
 *           content:
 *             application/json:
 *               example: There was an error during account creation, please try again.
 *   /auth/login:
 *     post:
 *       tags:
 *         - Auth
 *       requestBody:
 *         description: User login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginInput'
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/LoginResponse'
 *         401:
 *           description: Invalid email or password
 *           content:
 *             application/json:
 *               example: {"error": "Invalid email or password"}
 *         400:
 *           description: Login failed, please try again
 *           content:
 *             application/json:
 *               example: {"error": "Login failed, please try again"}
 *   /auth/refresh:
 *     post:
 *       tags:
 *         - Auth
 *       requestBody:
 *         description: Refresh access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshInput'
 *       responses:
 *         200:
 *           description: Access token refreshed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/RefreshResponse'
 *         401:
 *           description: User does not exist
 *           content:
 *             application/json:
 *               example: {"error": "User does not exist"}
 *         400:
 *           description: Refresh token is not valid |  Invalid access token or refresh token
 *           content:
 *             application/json:
 *               example: {"error": "Refresh token is not valid"}
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The user name.
 *           example: Le Van A
 *         email:
 *           type: string
 *           description: The user email.
 *           example: levana@gmail.com
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user name.
 *           required: true
 *           example: Le Van A
 *         email:
 *           type: string
 *           description: The user email.
 *           required: true
 *           example: levana@gmail.com
 *         password:
 *           type: string
 *           description: The user password.
 *           required: true
 *           example: a232fs
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: levana@gmail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: a232fs
 *       required:
 *         - email
 *         - password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: A message indicating the result of the login.
 *           example: Login successfully
 *         accessToken:
 *           type: string
 *           description: The access token for the user's session.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refreshToken:
 *           type: string
 *           description: The refresh token for the user's session.
 *           example: 1a2b3c4d5e6f7g8h9i0j
 *     RefreshInput:
 *       type: object
 *       properties:
 *         x_authorization:
 *           type: string
 *           description: The access token obtained during login.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         refreshToken:
 *           type: string
 *           description: The refresh token obtained during login.
 *           example: 1a2b3c4d5e6f7g8h9i0j
 *       required:
 *         - x_authorization
 *         - refreshToken
 *     RefreshResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The new access token for the refreshed session.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/refresh', authController.refreshToken)

module.exports = router
