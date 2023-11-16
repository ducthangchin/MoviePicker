module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        userId: {
            type: Sequelize.INTEGER,
            required: true,
        },
        movieId: {
            type: Sequelize.STRING,
            required: true,
        },
        content: {
            type: Sequelize.STRING,
            required: true,
        },
    });

    return Review;
};