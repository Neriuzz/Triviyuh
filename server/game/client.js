const { v4: uuidv4 } = require('uuid');

class Client {
    constructor(socket) {
        this.socket = socket;
        this.id = uuidv4();
    }
    
    setName(name) {
        this.name = name;
    }

    addToLobby(lobby) {
        this.lobby = lobby;
    }

    removeFromLobby(lobby) {
        if (this.lobby == lobby)
            delete this.lobby;
    }
}

module.exports = Client;