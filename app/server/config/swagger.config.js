module.exports = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Popcorn API Documentation',
            version: '0.1.0',
            description:
                'API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Duc Thang Chin',
                url: 'https://github.com/ducthangchin',
                email: 'ducthangchin@niuitmo.ru',
            },
        },
        servers: [
            {
                url: process.env.SWAGGER_API_DOCS_BASE_URL || 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
}