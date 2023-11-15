const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controllers')
const { isAuth } = require('../middlewares/auth.middlewares')

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: Review management
 * paths:
 *   /review/add:
 *     post:
 *       tags:
 *         - Review
 *       summary: Add a review for a movie
 *       requestBody:
 *         description: Add a review for a movie by providing user ID, movie ID, and content.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie_id:
 *                   type: string
 *                   description: The ID of the movie for which the review is being added.
 *                   example: "123abc"
 *                 content:
 *                   type: string
 *                   description: The content of the review.
 *                   example: "This movie is great!"
 *                 comment_id:
 *                   type: string
 *                   description: The ID of the comment associated with the review.
 *                   example: "456def"
 *       responses:
 *         200:
 *           description: Review added successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the review was added successfully.
 *                     example: "review added"
 *                   result:
 *                     $ref: '#/components/schemas/Review'
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /review/edit:
 *     post:
 *       tags:
 *         - Review
 *       summary: Edit a review
 *       requestBody:
 *         description: Edit a review by providing the review ID and new content.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review_id:
 *                   type: string
 *                   description: The ID of the review to be edited.
 *                   example: "789ghi"
 *                 new_content:
 *                   type: string
 *                   description: The new content for the review.
 *                   example: "Updated review content."
 *       responses:
 *         200:
 *           description: Review edited successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the review was edited successfully.
 *                     example: "review edited"
 *                   result:
 *                     type: boolean
 *                     description: Indicates whether the review was successfully edited.
 *                     example: true
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /review/delete:
 *     get:
 *       tags:
 *         - Review
 *       summary: Delete a review
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           description: The ID of the review to be deleted.
 *           example: "789ghi"
 *       responses:
 *         200:
 *           description: Review deleted successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: A message indicating that the review was deleted successfully.
 *                     example: "review 789ghi deleted"
 *         401:
 *           description: Unauthorized. User not authenticated or missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 *   /review/movie-reviews:
 *     get:
 *       tags:
 *         - Review
 *       summary: Get all reviews for a specific movie
 *       parameters:
 *         - in: query
 *           name: movie_id
 *           required: true
 *           description: The ID of the movie for which reviews are to be retrieved.
 *           example: "123abc"
 *       responses:
 *         200:
 *           description: Reviews retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Review'
 *         401:
 *           description: Unauthorized. Missing required parameters.
 *           content:
 *             application/json:
 *               example: {"error": "Missing 'movie_id' parameter in the request."}
 *   /review/all:
 *     get:
 *       tags:
 *         - Review
 *       summary: Get all reviews for the authenticated user
 *       responses:
 *         200:
 *           description: Reviews retrieved successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Review'
 *         401:
 *           description: Unauthorized. User not authenticated.
 *           content:
 *             application/json:
 *               example: {"error": "User not authenticated."}
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The review ID.
 *           example: 1
 *         user_id:
 *           type: integer
 *           description: The ID of the user who wrote the review.
 *           example: 123
 *         movie_id:
 *           type: string
 *           description: The ID of the movie being reviewed.
 *           example: "123abc"
 *         content:
 *           type: string
 *           description: The content of the review.
 *           example: "This movie is great!"
 */


router.post('/add', isAuth, reviewController.addReview)
router.post('/edit', isAuth, reviewController.editReview)
router.get('/delete', isAuth, reviewController.deleteReview)
router.get('/movie-reviews', reviewController.movieReview)
router.get('/all', isAuth, reviewController.userReview)

module.exports = router
