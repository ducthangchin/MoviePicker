const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controllers')

const { isAuth } = require('../middlewares/auth.middlewares')
const { imageUpload } = require('../middlewares/imageUpload.middlewares')

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management
 * paths:
 *   /user/public-info:
 *     get:
 *       tags:
 *         - User
 *       summary: Get public information of a user
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           description: The ID of the user for which public information is requested.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: User public information retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/UserPublicInfo'
 *         400:
 *           description: Bad request. The id parameter is missing.
 *           content:
 *             application/json:
 *               example: {"error": "Missing 'id' parameter in the request."}
 *         404:
 *           description: User not found.
 *           content:
 *             application/json:
 *               example: {"message": "User not found", "result": false}
 *   /user/delete:
 *     get:
 *       tags:
 *         - User
 *       summary: Delete a user
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           description: The ID of the user to be deleted.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: User deleted successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the user was deleted successfully.
 *                     example: "User with id 123abc has been deleted"
 *                   result:
 *                     type: boolean
 *                     description: Indicates whether the user was successfully deleted.
 *                     example: true
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /user/all:
 *     get:
 *       tags:
 *         - User
 *       summary: Get all users
 *       responses:
 *         200:
 *           description: Users retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /user/reset-password:
 *     post:
 *       tags:
 *         - User
 *       summary: Change user password
 *       requestBody:
 *         description: Change the password for the authenticated user.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 new_password:
 *                   type: string
 *                   description: The new password for the user.
 *                   example: "new_password123"
 *       responses:
 *         200:
 *           description: Password changed successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the password was changed successfully.
 *                     example: "Password changed successfully"
 *                   result:
 *                     type: boolean
 *                     description: Indicates whether the password was successfully changed.
 *                     example: true
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /user/set-name:
 *     post:
 *       tags:
 *         - User
 *       summary: Change user name
 *       requestBody:
 *         description: Change the name for the authenticated user.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 new_name:
 *                   type: string
 *                   description: The new name for the user.
 *                   example: "John Doe"
 *       responses:
 *         200:
 *           description: Name changed successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the name was changed successfully.
 *                     example: "Name changed successfully"
 *                   result:
 *                     type: boolean
 *                     description: Indicates whether the name was successfully changed.
 *                     example: true
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /user/upload-avatar:
 *     post:
 *       tags:
 *         - User
 *       summary: Upload user avatar
 *       requestBody:
 *         description: Upload a new avatar for the authenticated user.
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: The image file to upload as an avatar.
 *       responses:
 *         200:
 *           description: Avatar uploaded successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   avatar:
 *                     type: string
 *                     description: The filename of the uploaded avatar.
 *                     example: "avatar123.png"
 *         400:
 *           description: Bad request. The image upload failed.
 *           content:
 *             application/json:
 *               example: {"error": "Image upload failed."}
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /user/profile:
 *     get:
 *       tags:
 *         - User
 *       summary: Get user profile information
 *       responses:
 *         200:
 *           description: User profile information retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         401:
 *           description: Unauthorized. User not authenticated.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 * components:
 *   schemas:
 *     UserPublicInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The user name.
 *           example: "John Doe"
 *         role:
 *           type: string
 *           description: The user role.
 *           example: "user"
 *         avatar:
 *           type: string
 *           description: The filename of the user's avatar.
 *           example: "avatar123.png"
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
 *           example: "John Doe"
 *         role:
 *           type: string
 *           description: The user role.
 *           example: "user"
 *         avatar:
 *           type: string
 *           description: The filename of the user's avatar.
 *           example: "avatar123.png"
 */


router.get('/profile', isAuth, async (req, res) => {
    res.send(req.user)
})

router.get('/public-info', userController.getUserInfo)
router.get('/delete', isAuth, userController.deleteUser)
router.get('/all', isAuth, userController.getAllUsers)
router.post('/reset-password', isAuth, userController.changePassword)
router.post('/set-name', isAuth, userController.changeName)
router.post('/upload-avatar', isAuth, imageUpload.single('image'), userController.uploadAvatar, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



module.exports = router
