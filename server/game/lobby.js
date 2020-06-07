function generateId() {
    return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
}

class Lobby {
    constructor() {
        this.id = generateId();
        this.clients = {};
    }

    connectClient(client) {
        this.clients[client.id] = client;
        client.lobby = this.id;
    }

    disconnectClient(id) {
        delete clients[id].lobby;
        delete clients[id];
    }

    sendMessage(message, exclude) {
        // TODO: Allow users in the same lobby to talk to eachother
    }
}

module.exports = Lobby;