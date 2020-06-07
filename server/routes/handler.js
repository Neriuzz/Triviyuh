/**
 * 
 * SCHEMA

1. CREATE
{
	"type": "CREATE_LOBBY",
	"data": {
		"user": {
			"name": "Littus"
		}
	}
}

2. CONNECT
{
	"type": "CONNECT",
	"data": {
		"user": {
			"name": "Littus",
			"lobby": "7869"
		}
	}
}

3. MESSAGE (Client aware)
{
	"type": "MESSAGE",
    "data": {
        "message": "Yo this game is awesome! 🔥👌"
        }
}

4. DISCONNECT (Client aware)
{
    "type": "DISCONNECT",
    "data": {}
}

*/

const Client = require("../game/client");
const Lobby = require("../game/lobby");
const lobbies = require("../game/lobbies");

function handle(socket, message) {
    switch (message.type) {
        case "CONNECT":
            handleConnect(socket, message.data);
            break;
        case "CREATE_LOBBY":
            handleCreateLobby(socket, message.data);
            break;
        case "DISCONNECT":
            handleDisconnect(socket);
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
    let lobby = lobbies.getLobby(data.user.lobby);
    if (lobby) {

        // Create a new client and connect them
        let client = new Client(socket, data.user.name);
        lobby.connectClient(client);

        // Make handler client aware
        socket.client = client;

        // DEBUG
        socket.send(JSON.stringify({
            type: 'INFO',
            data: `Successfully connected ${client.id} to lobby ${lobby.id}`
        }));
    }
}

function handleDisconnect(client) {
    let lobby = lobbies.getLobby();
    if (lobby) {
        lobby.disconnectClient(data.user.id);
    }
}

function handleCreateLobby(socket, data) {
    // Create lobby and client
    let lobby = new Lobby();
    let client = new Client(socket, data.name);

    // Add client to lobby, add lobby to lobby list
    lobby.connectClient(client);
    lobbies.addLobby(lobby);

    // Make handler client aware
    socket.client = client;

    // DEBUG
    socket.send(JSON.stringify({
        type: "DEBUG",
        data: `Successfully created lobby with id: ${lobby.id}`
    }));
}

function handleMessage(socket, data) {
    let lobby = lobbies.getLobby(socket.client.lobby);
    
    // Check that the lobby exists, and the user is in that lobby.
    if (lobby && lobby.findClient(socket.client.id)) 
        lobby.sendMessage({ name: socket.client.name, message: data.message, time: new Date() }, socket.client.id);
}

function handleError(socket) {
    socket.send(JSON.stringify(
        {
            type: "WARNING",
            data: "Server couldn't understand your message."
        }
    ));
}

module.exports = {
    handle
}