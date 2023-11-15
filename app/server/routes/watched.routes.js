const express = require('express')
const router = express.Router()

const watchedController = require('../controllers/watched.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

/**
 * @swagger
 * tags:
 *   - name: Watched
 *     description: Watched movies management
 * paths:
 *   /watched/add:
 *     get:
 *       tags:
 *         - Watched
 *       summary: Add a movie to the watched list
 *       parameters:
 *         - in: query
 *           name: movie_id
 *           required: true
 *           description: The ID of the movie to be added to the watched list.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: Movie added to the watched list successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "Movie with id '123abc' has been added to the watched list successfully"
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /watched/remove:
 *     get:
 *       tags:
 *         - Watched
 *       summary: Remove a movie from the watched list
 *       parameters:
 *         - in: query
 *           name: movie_id
 *           required: true
 *           description: The ID of the movie to be removed from the watched list.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: Movie removed from the watched list successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *                 example: "Movie with id '123abc' has been deleted from the watched list"
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /watched/all:
 *     get:
 *       tags:
 *         - Watched
 *       summary: Get all movies in the user's watched list
 *       responses:
 *         200:
 *           description: Movies in the watched list retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "123abc"
 *         401:
 *           description: Unauthorized. User not authenticated.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /watched/views:
 *     get:
 *       tags:
 *         - Watched
 *       summary: Get the number of views for a specific movie
 *       parameters:
 *         - in: query
 *           name: movie_id
 *           required: true
 *           description: The ID of the movie for which to retrieve the number of views.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: Number of views retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   movie_id:
 *                     type: string
 *                     description: The ID of the movie.
 *                     example: "123abc"
 *                   views:
 *                     type: integer
 *                     description: The number of views for the movie.
 *                     example: 5
 *         401:
 *           description: Unauthorized. Missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "Missing 'movie_id' parameter in the request."}
 * components:
 *   schemas:
 *     WatchedMovie:
 *       type: string
 *       description: The ID of a movie in the watched list.
 *       example: "123abc"
 */


router.get('/add', isAuth, watchedController.addWatched)
router.get('/remove', isAuth, watchedController.removeWatched)
router.get('/all', isAuth, watchedController.userWatched)
router.get('/views', watchedController.movieWatchedCount)

module.exports = router
