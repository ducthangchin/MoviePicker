module.exports = (sequelize, Sequelize) => {
    const Bookmark = sequelize.define("bookmark", {
        userId: {
            type: Sequelize.INTEGER,
            required: true,
        },
        movieId: {
            type: Sequelize.STRING,
            required: true,
        },
        category: {
            type: Sequelize.STRING,
            required: true,
        },
    });

    return Bookmark;
};