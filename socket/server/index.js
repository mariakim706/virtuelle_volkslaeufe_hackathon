const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v1');
const _ = require('lodash');

const PORT = process.env.PORT || 3000;

const rooms = {};

const joinRoom = (socket, room) => {
    room.sockets.push(socket);
    socket.join(room.id, () => {
        socket.roomId = room.id;
        console.log(socket.id, "Joined", room.id);
    });
};

const leaveRooms = (socket) => {
    const roomsToDelete = [];
    for (const id in rooms) {
        const room = rooms[id];
        if (room.sockets.includes(socket)) {
            socket.leave(id);
            room.sockets = room.sockets.filter((item) => item !== socket);
        }
        if (room.sockets.length == 0) {
            roomsToDelete.push(room);
        }
    }

    for (const room of roomsToDelete) {
        delete rooms[room.id];
    }
};


const begin = (socket, id) => {
    if (id && socket.id !== id) {
        return;
    }

    const room = rooms[socket.roomId];
    if (!room) {
        return;
    }

    if (room.timeout) {
        clearTimeout(room.timeout);
    }

    const output = {};

    for (const client of room.sockets) {

        //todo: start running

    }

    for (const client of room.sockets) {
    }

    room.timeout = setTimeout(() => {
            begin(socket, null);
    }, 20 * 1000);

};

io.on('connection', (socket) => {
    socket.id = uuid();
    console.log( socket.id + 'connected');

    socket.on('ready', () => {
    console.log(socket.id, ' ready');
    const room = rooms[socket.roomId];

    if (room.sockets.length == 2) {
        // to do: start on click
        for (const client of room.sockets) {
            client.emit('init');
        }
    }
});

socket.on('start', (data, callback) => {
    const room = rooms[socket.roomId];
    if (!room) {
        return;
    }
    const others = [];
    for (const client of room.sockets) {
        if (client === socket) {
            continue;
        }
        others.push({
            id: client.id,
            data: {test: client.id}
        });
    }

setTimeout(() => {
    begin(socket, null);
}, 5000);
});

socket.on('moved', (data) => {
    data = JSON.parse(data);
    const room = rooms[socket.roomId];
    if (!room) {
        return;
    }
    //todo set data

    for (const client of room.sockets) {
        if (client == socket) {
            continue;
        }
        client.emit(socket.id, {
            data: {test: client.id}
        });
    }
});

socket.on('getRoomNames', (data, callback) => {
    const roomNames = [];
    for (const id in rooms) {
        const {name} = rooms[id];
        const room = {name, id};
        roomNames.push(room);
    }

    callback(roomNames);
});

socket.on('createRoom', (roomName, callback) => {
    const room = {
        id: uuid(),
        name: roomName,
        sockets: []
    };
    rooms[room.id] = room;
    joinRoom(socket, room);
    callback();
});

socket.on('joinRoom', (roomId, callback) => {
    const room = rooms[roomId];
joinRoom(socket, room);
callback();
});

socket.on('leaveRoom', () => {
    leaveRooms(socket);
});

socket.on('disconnect', () => {
        leaveRooms(socket);
    });
});

http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
});