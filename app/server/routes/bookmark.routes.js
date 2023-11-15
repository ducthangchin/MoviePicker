const express = require('express')
const router = express.Router()

const bookmarkController = require('../controllers/bookmark.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

/**
 * @swagger
 * tags:
 *  name: Bookmark
 *  description: Bookmark management
 * paths:
 *  /bookmark/add:
 *   get:
 *    tags:
 *     - Bookmark
 *    parameters:
 *     - name: x_authorization
 *       in: header
 *       required: true
 *     - name: movie_id
 *       in: query
 *       required: true
 *       description: Id of movie
 *     - name: category
 *       in: query
 *       required: true
 *    responses:
 *     200:
 *      description: Bookmark has been added successfully
 *      content:
 *        application/json:
 *         example: Bookmark has been added successfully
 *     401:
 *      description: Bookmark has already existed
 *      content:
 *       application/json:
 *        example: Bookmark has already existed
 *  /bookmark/remove:
 *   get:
 *    tags:
 *     - Bookmark
 *    parameters:
 *     - name: x_authorization
 *       in: header
 *       required: true
 *     - name: movie_id
 *       in: query
 *       required: true
 *       description: Id of movie  
 *    responses:
 *     200:
 *      description: Bookmark has been deleted successfully
 *      content:
 *       application/json:
 *        example: Bookmark has been deleted successfully
 *     401:
 *      description: Bookmark does not exist
 *      content:
 *       application/json:
 *        example: Bookmark does not exist
 * /bookmark/all:
 *  get:
 *   tags: 
 *    - Bookmark
 *   parameters:
 *     - name: x_authorization
 *       in: header
 *       required: true
 *   responses:
 *    200:
 *     description: List of bookmarks
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Bookmark'
 *        
 * components:
 *  schemas:
 *   Bookmark:
 *    type: object
 *    properties:
 *     movieId:
 *      type: integer   
 *      description: Id of movie
 *      example: 1
 *     category:
 *      type: string
 *      description: Category of movie
 *      example: 'action'  
 */


router.get('/add', isAuth, bookmarkController.addBookmark)
router.get('/remove', isAuth, bookmarkController.removeBookmark)
router.get('/all', isAuth, bookmarkController.userBookmark)

module.exports = router
