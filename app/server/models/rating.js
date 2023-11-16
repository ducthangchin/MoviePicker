module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define("rating", {
        userId: {
            type: Sequelize.INTEGER,
            required: true,
        },
        movieId: {
            type: Sequelize.STRING,
            required: true,
        },
        score: {
            type: Sequelize.INTEGER,
            required: true,
        },
    });

    return Rating;
};