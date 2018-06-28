const Configuration = require('./config.json');
const Hapi = require('hapi');
const Inert = require('inert');
const Routes = require('./routes');

const server = Hapi.server({
    port: Configuration.port,
    host: Configuration.host
});

const initializeServer = async () => {
    await server.register(Inert);
    await server.route(Routes);
    await server.start();
    console.log(`メ² is running at: ${server.info.uri}`);
};

initializeServer();