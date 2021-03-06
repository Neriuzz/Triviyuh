/**
 * 
 * SCHEMA

1. CREATE_LOBBY
{
	"type": "CREATE_LOBBY",
	"data": {
		"name": "Nerius"
	}
}

2. JOIN_LOBBY
{
    "type": "JOIN_LOBBY",
    "data": {
        "name": "Nerius",
        "lobby": "1234"
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
    "type": "DISCONNECT"
}

*/

const Lobby = require("../game/lobby");
const lobbies = require("../game/lobbies");

module.exports = {
    "CREATE_LOBBY": (client, data) => {
        // Check if user is already in a lobby
        if (client.lobby) {
            client.socket.send(JSON.stringify({
                type: "ERROR",
                data: "Please leave your current lobby first"
            }));
        }

         // Set client name
        client.setName(data.name);

        // Create lobby
        let lobby = new Lobby();

        // Add client to lobby, add lobby to lobby list
        lobby.connectClient(client);
        lobbies.addLobby(lobby);

        // DEBUG
        client.socket.send(JSON.stringify({
            type: "DEBUG",
            data: `Successfully created lobby with id: ${lobby.id}`
        }));
    },

    "JOIN_LOBBY": (client, data) => {
        // Check if user is already in a lobby
        if (client.lobby) {
            client.socket.send(JSON.stringify({
                type: "ERROR",
                data: "Please leave your current lobby first"
            }));
            return;
        }

        let lobby = lobbies.getLobby(data.lobby);
        if (lobby) {
            // Set client name
            client.setName(data.name);
            // Connect client to lobby if lobby exists
            lobby.connectClient(client);

            // DEBUG
            client.socket.send(JSON.stringify({
                type: 'DEBUG',
                data: `Successfully connected ${client.id} to lobby ${lobby.id}`
            }));
        }
    },

    "MESSAGE": (client, data) => {
        let lobby = lobbies.getLobby(client.lobby);

        // Check that the lobby exists, and the user is in that lobby.
        if (lobby && lobby.findClient(client.id)) 
            lobby.sendMessage({ name: client.name, message: data.message, time: new Date() }, client.id);
    },

    "DISCONNECT": (client, data) => {
        // Remove client from lobbies
        let lobby = lobbies.getLobby();
        if (lobby)
            lobby.disconnectClient(client.id);
    }
}