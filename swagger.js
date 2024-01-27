const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Books API',
        description: 'Books Api for CSE341 Project 2'
    },
    host: 'localhost:3000',
    schemas: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);