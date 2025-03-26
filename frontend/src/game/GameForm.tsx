import { useState } from 'react';
import { Socket } from 'socket.io-client';

type GameFormProps = {
    socket: Socket;
    isConnected: boolean;
};

const GameForm = ({ socket, isConnected }: GameFormProps) => {
    const [playerName, setPlayerName] = useState('');
    const [gameName, setGameName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleCreateGame = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerName || !gameName || !password) {
            setError('Моля попълнете всички полета');
        }
        if (isConnected) {
            socket.emit('createRoom', {
                playerName,
                gameName,
                password,
            });
            setPlayerName('');
            setGameName('');
            setPassword('');
        }
    };

    const handleJoinGame = (e: React.FormEvent) => {
        e.preventDefault();
        if (!playerName || !gameName || !password) {
            setError('Моля попълнете всички полета');
        }
        if (isConnected) {
            socket.emit('joinGame', {
                playerName,
                gameName,
                password,
            });
            setPlayerName('');
            setGameName('');
            setPassword('');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-[500px]'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
                    Нова игра
                </h2>
                <form>
                    <div className='flex flex-col gap-3'>
                        <input
                            className='bg-slate-300 focus:border-slate-400 focus:ring-slate-400 block w-full p-3 placeholder-black'
                            type='text'
                            name='player-name'
                            placeholder='Име на играча'
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                        <input
                            className='bg-slate-300 focus:border-slate-400 focus:ring-slate-400 block w-full p-3 placeholder-black'
                            type='text'
                            name='name'
                            placeholder='Име на играта'
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                        />
                        <input
                            className='bg-slate-300 focus:border-slate-400 focus:ring-slate-400 block w-full p-3 placeholder-black'
                            type='password'
                            name='game-password'
                            placeholder='Парола на играта'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <button
                            onClick={handleCreateGame}
                            className='cursor-pointer border border-slate-400 bg-green-200 text-black font-bold py-2 px-4 rounded-full mt-6 hover:bg-white hover:text-slate-400 hover:border-slate-400 transition-colors'
                            type='submit'
                        >
                            Започни игра
                        </button>
                        <button
                            onClick={handleJoinGame}
                            className='cursor-pointer border border-slate-400 bg-green-200 text-black font-bold py-2 px-4 rounded-full mt-6 hover:bg-white hover:text-slate-400 hover:border-slate-400 transition-colors'
                            type='submit'
                        >
                            Включи се в игра
                        </button>
                    </div>
                    {error && (
                        <div className='text-red-500 text-center mt-4'>
                            {' '}
                            {error}{' '}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default GameForm;
