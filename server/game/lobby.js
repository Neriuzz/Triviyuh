const lobbies = require("./lobbies");

// Generate a random 4 digit number (0000 - 9999)
function generateId() {
    return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
}

/**
 * Manages a collection of users that are in the same lobby, allowing
 * them to talk to eachother.
 */
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
        
        // Delete the lobby if its empty
        if (this.clients.length < 0)
            lobbies.removeLobby(this.id);

    }
    
    findClient(id) {
        return this.clients[id];
    }

    sendMessage(data, exclude) {
        // Stringify the message and get it ready to be sent
        const toSend = JSON.stringify({
            type: 'MESSAGE',
            data
        });

        // Broadcast the message to everyone in the lobby, except for the user who sent it
        Object.keys(this.clients).filter(id => id !== exclude).forEach(id => {
            this.clients[id].socket.send(toSend);
        });
    }
}

module.exports = Lobby;