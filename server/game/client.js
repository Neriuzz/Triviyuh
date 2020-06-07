const { v4: uuidv4 } = require('uuid');

class Client {
    constructor(socket, name) {
        this.socket = socket;
        this.name = name;
        this.id = uuidv4();
    }
}

module.exports = Client;