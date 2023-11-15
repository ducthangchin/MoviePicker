require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./config/swagger.config')

const authRouter = require('./routes/auth.routes')
const ratingRouter = require('./routes/rating.routes')
const userRouter = require('./routes/user.routes')
const reviewRouter = require('./routes/review.routes')
const bookmarkRouter = require('./routes/bookmark.routes')
const watchedRouter = require('./routes/watched.routes')

const app = express()
const port = process.env.PORT || 5000
const apiDocsUrl = process.env.SWAGGER_API_DOCS_URL || '/api-docs'

const specs = swaggerJsdoc(swaggerConfig)
app.use(apiDocsUrl, swaggerUi.serve, swaggerUi.setup(specs))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port, () => console.log(`Server is running on port ${port}`))

app.get('/', (req, res) => {
    res.send('API IS RUNNING')
})

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/rating', ratingRouter)
app.use('/review', reviewRouter)
app.use('/bookmark', bookmarkRouter)
app.use('/watched', watchedRouter)

// test zone
