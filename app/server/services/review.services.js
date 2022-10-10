const query = require('./mysql.services')

const getReviewById = async id => {
    const result = await query(
        "SELECT * FROM review WHERE id = ?",
        id
    )
    return result.length == 0 ? false : result[0]
}

const getAllReviewsByUserID = async user_id => await query(
    "SELECT * FROM review WHERE user_id = ?",
    user_id
)

const getAllReviewsByMovieID = async movie_id => await query(
    "SELECT * FROM review WHERE movie_id = ?",
    movie_id
)

const addReview = async (user_id, movie_id, content) => await query(
    "INSERT INTO review (user_id, movie_id, content) VALUES (?, ?, ?)",
    [user_id, movie_id, content]
)

const updateReview = async (id, new_content) => await query(
    "UPDATE review SET content = ? WHERE id = ?",
    [new_content, id]
)

const deleteReview = async (id) => await query(
    "DELETE FROM review WHERE id = ?",
    id
)

module.exports = {
    addReview,
    getReviewById,
    getAllReviewsByMovieID,
    getAllReviewsByUserID,
    updateReview,
    deleteReview
}

