const GenerateMemeHandler = require('./handler/generateMeme');
const ServeMemeHandler = require('./handler/serveMeme');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file(
                '../client/index.html',
                { confine: false }
            );
        }
    },
    {
        method: 'GET',
        path: '/bundle/{filename}',
        handler: (request, h) => {
            return h.file(
                `../client/bundle/${request.params.filename}`,
                { confine: false }
            );
        }
    },
    {
        method: 'POST',
        path: '/generate',
        handler: GenerateMemeHandler,
        options: {
            payload: {
                output: 'stream',
                allow: 'multipart/form-data'
            },
            validate: {
                query: {
                    'top-text': Joi.string(),
                    'bottom-text': Joi.string(),
                    'font-size': Joi.number().integer().min(1),
                    'stroke-width': Joi.number().integer().min(0),
                    'padding': Joi.number().integer().min(0),
                    'border': Joi.boolean()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/m/{uuid}',
        handler: ServeMemeHandler
    }
];