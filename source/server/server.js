const Configuration = require('./config.json');
const Hapi = require('hapi');

const server = Hapi.server({
    port: Configuration.port,
    host: Configuration.host
});

const initializeServer = async () => {
    await server.start();
    console.log(`メ² is running at: ${server.info.uri}`);
};

initializeServer();