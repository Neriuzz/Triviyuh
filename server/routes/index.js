const handler = require("./handler");

module.exports = function (fastify, opts, done) {
    fastify.get("/", async (req, res) => {
        res.sendFile("pages/index.html");
    });
    
    fastify.get("/ws", { websocket: true }, async (req, res) => {
        req.socket.onmessage = (event) => handler.handle(req.socket, JSON.parse(event.data));
    });

    done();
}
