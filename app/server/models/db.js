const { Sequelize } = require('sequelize');
const DB_config = require('../config/database.config');

const sequelize = new Sequelize(DB_config.database, DB_config.user, DB_config.password, {
    host: DB_config.host,
    dialect: 'postgres',
    pool: {
        max: 10,
        idle: 20000,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Review = require("./review")(sequelize, Sequelize);
db.Bookmark = require("./bookmark")(sequelize, Sequelize);
db.Rating = require("./rating")(sequelize, Sequelize);
db.Watched = require("./watched")(sequelize, Sequelize);

//------------------RELATIONS------------------//

db.User.hasMany(db.Review, { as: "reviews" });
db.Review.belongsTo(db.User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});

db.User.hasMany(db.Bookmark, { as: "bookmarks" });
db.Bookmark.belongsTo(db.User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});

db.User.hasMany(db.Rating, { as: "ratings" });
db.Rating.belongsTo(db.Rating, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});

db.User.hasMany(db.Watched, { as: "watcheds" });
db.Watched.belongsTo(db.User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user",
});

module.exports = db;
