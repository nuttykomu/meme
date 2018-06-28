const GenerateMemeHandler = require('./handler/generateMeme');

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => 'Hello from メ²!'
    },
    {
        method: 'POST',
        path: '/generate',
        handler: GenerateMemeHandler,
        config: {
            payload: {
                output: 'stream',
                allow: 'multipart/form-data'
            },
        }
    }
];