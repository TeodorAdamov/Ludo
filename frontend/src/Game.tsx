import { useEffect, useState } from 'react';
import GameBoard from './game/GameBoard';
import GameForm from './game/GameForm';
import { useSocket } from './hooks/useSocket';
import { Player } from './types/GameTypes';

function Game() {
    const { socket, isConnected } = useSocket();
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        socket.on('Room created', ({ gameName, players }) => {
            setGameName(gameName);
            setPlayers(players);
            console.log(gameName, players);
        });

        socket.on('Player joined', ({ gameName, players }) => {
            setGameName(gameName);
            setPlayers(players);
            console.log(gameName, players);
        });

        return () => {
            socket.off('Room created');
            socket.off('Player joined');
        };
    }, [socket]);

    return (
        <div>
            <p className='font-bold'>{gameName}</p>
            <ul>
                {players.map((player, i) => (
                    <li key={i}>{player.name}</li>
                ))}
            </ul>
            {!gameName && (
                <GameForm socket={socket} isConnected={isConnected} />
            )}
            {gameName && (
                <GameBoard socket={socket} isConnected={isConnected} />
            )}
        </div>
    );
}

export default Game;
