// Modules
const fastify = require("fastify")();
const path = require("path");
const game = require("./game/lobbies");

// Register plugins
fastify.register(require("fastify-websocket"));
fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../static")
});

// Routes routes
fastify.register(require("./routes"));

// Start the server
const start = async () => {
    try {
        await fastify.listen(3000);
        console.log(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();


// Handle errors
process.on("uncaughtException", (err) => {
    console.error(`Uncaught exception: ${err.stack}`);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled promise rejection: ${err.stack}`);
    process.exit(1);
});