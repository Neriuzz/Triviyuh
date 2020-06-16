import handler from "./handler";

var ws;

// Connect and register message handler
export default function connect() {
    ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = (event) => handle(ws, event);
};

function handle(socket, event) {
    let message = JSON.parse(event.data);

    if (handler[message.type])
        handler[message.type](socket, message.data);
}

