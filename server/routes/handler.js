const Client = require("../game/client");
const Lobby = require("../game/lobby");
const lobbies = require("../game/lobbies");

/**
 *  Message Structure
 *  TYPE: Type of message
 *      - CONNECT
 *      - DISCONNECT
 *      - CREATE_LOBBY
 *      - MESSAGE
 *  DATA: Contents of the message
 */

function handle(socket, message) {
    switch (message.type) {
        case "CONNECT":
            handleConnect(socket, message.data);
            break;
        case "DISCONNECT":
            handleDisconnect(socket, message.data);
            break;
        case "CREATE_LOBBY":
            handleCreateLobby(socket, message.data);
            break;
        case "MESSAGE":
            handleMessage(socket, message.data);
            break;
        default:
            console.warn(`Unsupported message type: ${message.type}`);
            handleError(socket);
            break;     
    }
}

function handleConnect(socket, data) {
    let lobby = lobbies.getLobby(data.lobbyid);
    if (lobby) {
        let client = new Client(socket, data.name);
        lobby.connectClient(client);
        socket.send(JSON.stringify({
            type: 'INFO',
            data: `Successfully connected ${client.id} to lobby ${lobby.id}`
        }));
    }
}

function handleDisconnect(socket, data) {
    let lobby = lobbies.getLobby(data.user.lobbyid);
    if (lobby) {
        lobby.disconnectClient(data.user.id);
    }
}

function handleCreateLobby(socket, data) {
    let lobby = new Lobby();
    let client = new Client(socket, data.name);
    lobby.connectClient(client);
    lobbies.addLobby(lobby);
    socket.send(JSON.stringify({
        type: "INFO",
        data: `Successfully created lobby with id: ${lobby.id}`
    }));
}

function handleMessage(socket, data) {
    let lobby = lobbies.getLobby(data.user.lobby);
    if (lobby) 
        lobby.sendMessage({ name: data.user.name, message: data.message, time: new Date() }, data.user.id);
}

function handleError(socket) {
    socket.send(JSON.stringify(
        {
            type: "INFO",
            data: "Server couldn't understand your message."
        }
    ));
}

module.exports = {
    handle
}