import { useEffect, useState } from 'react';
import socket from '../api/socket';

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        // Connect to the WebSocket server when component mounts
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        return () => {
            // Disconnect when component unmounts
            socket.disconnect();
            socket.off('Game Created');
        };
    }, []);

    return { socket, isConnected };
};
