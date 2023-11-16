module.exports = (sequelize, Sequelize) => {
    const Watched = sequelize.define("watched", {
        userId: {
            type: Sequelize.INTEGER,
            required: true,
        },
        movieId: {
            type: Sequelize.STRING,
            required: true,
        },
    });

    return Watched;
};