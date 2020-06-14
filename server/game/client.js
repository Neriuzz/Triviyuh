const { v4: uuidv4 } = require('uuid');

class Client {
    constructor(socket) {
        this.socket = socket;
        this.id = uuidv4();
    }
    
    setName(name) {
        this.name = name;
    }
}

module.exports = Client;