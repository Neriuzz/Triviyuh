var ws;

// Connect and register message handler
function connect() {
    ws = new WebSocket("ws://localhost:3000/ws");
    ws.onmessage = (event) => handleMessage(event);
};

function handleMessage(message) {
    let data = JSON.parse(message.data);
    console.log(data);
}

export default {
    connect
}

