let lobbies = {};

function addLobby(lobby) {
    lobbies[lobby.id] = lobby;
}

function removeLobby(lobby) {
    if(lobbies[lobby.id])
        delete lobbies[lobby.id];
}

function getLobby(id) {
    return lobbies[id];
}

module.exports = {
    addLobby,
    removeLobby,
    getLobby,
}