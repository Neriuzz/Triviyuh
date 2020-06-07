let lobbies = {};

function addLobby(lobby) {
    lobbies[lobby.id] = lobby;
}

function removeLobby(id) {
    if(lobbies[id])
        delete lobbies[id];
}

function getLobby(id) {
    return lobbies[id];
}

module.exports = {
    addLobby,
    removeLobby,
    getLobby,
}