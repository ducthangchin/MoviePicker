require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./config/swagger.config');

const tmdbRouter = require('./routes/tmdb.routes');
const authRouter = require('./routes/auth.routes');
const ratingRouter = require('./routes/rating.routes');
const userRouter = require('./routes/user.routes');
const reviewRouter = require('./routes/review.routes');
const bookmarkRouter = require('./routes/bookmark.routes');
const watchedRouter = require('./routes/watched.routes');

const app = express();
const port = process.env.PORT || 5000;
const apiDocsUrl = process.env.SWAGGER_API_DOCS_URL || '/api-docs';

const specs = swaggerJsdoc(swaggerConfig);
app.use(apiDocsUrl, swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require('./models/db');

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API DOCS URL: /${apiDocsUrl}`);

  db.sequelize.sync({ alter: true })
    .then(() => {
      console.log("Synced db.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });
});

app.get('/', async (req, res) => {
  const { User, Review } = db;
  const list = await Review.findAll({
    where: {
      userId: 6,
    },
    include: [{
      model: User,
      as: 'user',
    }],
  });

  res.send(list);
});


app.use('/tmdb', tmdbRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/rating', ratingRouter);
app.use('/review', reviewRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/watched', watchedRouter);

// test zone
