module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            required: true,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "default.png",
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user",
        },
        refreshToken: {
            type: Sequelize.STRING,
            required: false,
        }
    });

    return User;
};