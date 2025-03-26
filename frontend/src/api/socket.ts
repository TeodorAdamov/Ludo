import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:3000'; // Backend URL goes here
const socket: Socket = io(URL, {
    autoConnect: false,
    transports: ['websocket'],
});

export default socket;
