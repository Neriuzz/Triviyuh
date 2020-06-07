/**
 * 
 * SCHEMA
{
	"type": ...,
	"data": {
		"user": {
			"name": ...,
			"id": ...,
			"lobby": ...
		},
		"message": "..."
	}
}

1. CREATE
{
	"type": "CREATE_LOBBY",
	"data": {
		"user": {
			"name": "Nerius"
		}
	}
}

2. CONNECT
{
	"type": "CONNECT",
	"data": {
		"user": {
			"name": "Littus",
			"lobby": "0779"
		}
	}
}

3. MESSAGE
{
	"type": "MESSAGE",
	"data": {
		"user": {
			"name": "Littus",
			"id": "5e1b9eae-2ccf-45f1-ae03-6b5acc41ced0",
			"lobby": "0779"
		},
		"message": "Yo this game is awesome! 🔥👌"
	}
}

4. DISCONNECT
{
	"type": "DISCONNECT",
	"data": {
		"user": {
			"name": "Littus",
			"id": "5e1b9eae-2ccf-45f1-ae03-6b5acc41ced0",
			"lobby": "0779"
		}
	}
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
        case "DISCONNECT":
            handleDisconnect(message.data);
            break;
        case "CREATE_LOBBY":
            handleCreateLobby(socket, message.data);
            break;
        case "MESSAGE":
            handleMessage(message.data);
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

        // DEBUG
        socket.send(JSON.stringify({
            type: 'INFO',
            data: `Successfully connected ${client.id} to lobby ${lobby.id}`
        }));
    }
}

function handleDisconnect(data) {
    let lobby = lobbies.getLobby(data.user.lobby);
    if (lobby) {
        lobby.disconnectClient(data.user.id);
    }
}

function handleCreateLobby(socket, data) {
    let lobby = new Lobby();
    let client = new Client(socket, data.name);

    lobby.connectClient(client);
    lobbies.addLobby(lobby);

    // DEBUG
    socket.send(JSON.stringify({
        type: "DEBUG",
        data: `Successfully created lobby with id: ${lobby.id}`
    }));
}

function handleMessage(data) {
    let lobby = lobbies.getLobby(data.user.lobby);
    
    // Check that the lobby exists, and the user is in that lobby.
    if (lobby && lobby.findClient(data.user.id)) 
        lobby.sendMessage({ name: data.user.name, message: data.message, time: new Date() }, data.user.id);
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