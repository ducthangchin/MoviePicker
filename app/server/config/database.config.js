module.exports = {
    user: process.env.DB_USERNAME || 'postgres',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'utc'
}
