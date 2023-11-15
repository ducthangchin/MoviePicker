const DB_config = require('../config/database.config')
const { Pool } = require('pg')

const pool = new Pool({
    ...DB_config,
    max: 10,
    idleTimeoutMillis: 20000,
})

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

const connectToDB = async () => {
    try {
        const client = await pool.connect()
        console.log('Connected to database')
        client.release()
    } catch (err) {
        console.error('Error connecting to database:', err.message || err)
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            setTimeout(connectToDB, 2000)
        }
    }
}

connectToDB()

// const poolInfo = () => {
//     console.log('pool.totalCount:', pool.totalCount)
//     console.log('pool.idleCount:', pool.idleCount)
//     console.log('pool.waitingCount:', pool.waitingCount)
//     console.log('-----------------------------------')
//     setTimeout(poolInfo, 2000)
// }

// poolInfo()

const query = (sql, params) => pool.query(sql, params)

module.exports = query
