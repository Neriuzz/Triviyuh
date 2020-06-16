const handler = require("./handler");
const Client = require("../game/client");

function handle(client, event) {
    let message = JSON.parse(event.data);

    if (handler[message.type])
        handler[message.type](client, message.data);
}

// Export single route that handles HTTP and WS requests
module.exports = {
    method: "GET",
    url: "/",
    handler: (req, res) => {
        res.sendFile("pages/index.html");
    },
    wsHandler: (conn, req) => {
        // Create new client
        let client = new Client(conn.socket);

        // Register handlers
        client.socket.onmessage = (event) => handle(client, event);
        client.socket.onclose = (event) => handler.DISCONNECT(client);
    }
}

