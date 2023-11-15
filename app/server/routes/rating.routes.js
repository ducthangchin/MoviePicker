const express = require('express')
const router = express.Router()

const ratingController = require('../controllers/rating.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

/**
 * @swagger
 * tags:
 *   - name: Rating
 *     description: Rating management
 * paths:
 *   /rating/rate-movie:
 *     post:
 *       tags:
 *         - Rating
 *       summary: Rate a movie
 *       requestBody:
 *         description: Rate a movie by providing user ID, movie ID, and score.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: integer
 *                   description: The user's rating score for the movie.
 *                   example: 4
 *                 movie_id:
 *                   type: string
 *                   description: The ID of the movie being rated.
 *                   example: "123abc"
 *       responses:
 *         200:
 *           description: Rating created or updated successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating whether a new rating was created or an existing one was updated.
 *                     example: "new rating created"
 *                   result:
 *                     $ref: '#/components/schemas/Rating'
 *         400:
 *           description: Bad request. The request body is missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "Missing required parameters in the request body."}
 *         401:
 *           description: Unauthorized. User not authenticated.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /rating/movie-ratings:
 *     get:
 *       tags:
 *         - Rating
 *       summary: Get all ratings for a specific movie
 *       parameters:
 *         - in: query
 *           name: movie_id
 *           required: true
 *           description: The ID of the movie for which ratings are to be retrieved.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: Ratings retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Rating'
 *         400:
 *           description: Bad request. The movie_id parameter is missing.
 *           content:
 *             application/json:
 *               example: {"error": "Missing 'movie_id' parameter in the request."}
 *   /rating/user-ratings:
 *     get:
 *       tags:
 *         - Rating
 *       summary: Get all ratings for the authenticated user
 *       responses:
 *         200:
 *           description: Ratings retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Rating'
 *         401:
 *           description: Unauthorized. User not authenticated.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The rating ID.
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The ID of the user who gave the rating.
 *           example: 123
 *         movie_id:
 *           type: string
 *           description: The ID of the movie being rated.
 *           example: "123abc"
 *         score:
 *           type: integer
 *           description: The rating score given by the user.
 *           example: 4
 */


router.post('/rate-movie', isAuth, ratingController.rateMovie)
router.get('/movie-ratings', ratingController.movieRating)
router.get('/user-ratings', isAuth, ratingController.userRating)

module.exports = router
