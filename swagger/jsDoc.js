import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Handmade Backend API',
            version: '1.0.0',
            description: 'Back end for Green Monkeys Handmade Application'
        }
    },
    apis: ['../routes/*.js', '../app.js']
};

export const specs = swaggerJsdoc(options);