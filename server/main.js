// Modules
const fastify = require("fastify")();
const path = require("path");

// Register plugins
fastify.register(require("fastify-websocket"));
fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "../static")
});

// Register routes
fastify.route(require("./routes"));

// Start the server via IIFE
(async () => {
    try {
        await fastify.listen(3000);
        console.log(`Server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})();


// Handle errors
process.on("uncaughtException", (err) => {
    console.error(`Uncaught exception: ${err.stack}`);
    process.exit(1);
});

process.on("unhandledRejection", (err) => {
    console.error(`Unhandled promise rejection: ${err.stack}`);
    process.exit(1);
});