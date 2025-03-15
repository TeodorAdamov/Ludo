import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { GameManager } from './game/GameManager';
import { CreateGameType, JoinGameType } from './types/gameTypes';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*',
    },
});

const gameManager = new GameManager();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
    res.send('APP is running');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('createGame', ({ gameCreator }: CreateGameType) => {
        const gameId = gameManager.createGame();
        const room = gameManager.getGame(gameId);
        if (room) {
            room.addPlayer(socket.id, gameCreator);
        }
        socket.emit('game created and first player joined', { gameId });
    });

    socket.on('joinGame', ({ gameId, playerName }: JoinGameType) => {
        const room = gameManager.getGame(gameId);
        if (room) {
            room.addPlayer(socket.id, playerName);
            io.to(gameId).emit('player joined', { players: room.players });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
