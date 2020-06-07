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

    sendMessage(name, message, exclude) {
        // Stringify the message and get it ready to be sent
        const toSend = JSON.stringify({
            type: 'MESSAGE',
            data: {
                name,
                message,
                time: new Date()
            }
        });

        // Broadcast the message to everyone in the lobby, except for the user who sent it
        Object.keys(this.clients).filter(id => id !== exclude).forEach(id => {
            this.clients[id].socket.send(toSend);
        });
    }
}

module.exports = Lobby;