const handler = require("./handler");
const Client = require("../game/client");

function handle(client, event) {
    let message = JSON.parse(event.data);

    if (handler[message.type])
        handler[message.type](client, message.data);
}

module.exports = function (fastify, opts, done) {
    fastify.get("/", async (req, res) => {
        res.sendFile("pages/index.html");
    });
    
    fastify.get("/ws", { websocket: true }, async (req, res) => {
        // Createt new client
        let client = new Client(req.socket);

        // Register handlers
        client.socket.onmessage = (event) => handle(client, event); 
        client.socket.onclose = (event) => handler.DISCONNECT(client);
    });

    done();
}

