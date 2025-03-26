import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import { GameManager } from './game/GameManager';
import { GameType } from './types/gameTypes';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
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

    socket.on('createRoom', ({ playerName, gameName, password }: GameType) => {
        console.log(playerName, gameName, password);
        const existingGame = gameManager.getGame(gameName);
        if (existingGame) {
            socket.emit('Create error', { message: 'Game already exists' });
            return;
        }

        gameManager.createGame(gameName, password);
        const room = gameManager.getGame(gameName);
        if (room) {
            room.addPlayer(socket.id, playerName);
            socket.join(gameName);
            socket.emit('Room created', { gameName, players: room.players });
        }
    });

    socket.on('joinGame', ({ playerName, gameName, password }: GameType) => {
        const room = gameManager.getGame(gameName);
        if (!room) {
            socket.emit('Join error', { message: 'Game not found' });
            return;
        }
        if (room.password !== password) {
            socket.emit('Join error', { message: 'Invalid password' });
            return;
        }
        if (room) {
            room.addPlayer(socket.id, playerName);
            socket.join(gameName);
            io.to(room.gameName).emit('Player joined', {
                gameName,
                players: room.players,
            });
        }
    });

    socket.on('rollDice', ({ gameId }) => {
        const room = gameManager.getGame(gameId);
        if (room) {
            const diceNumber = room.rollDice();
            io.to(gameId).emit('diceRolled', { diceNumber });
            room.nextTurn();
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
