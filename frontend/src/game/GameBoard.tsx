import { useEffect, useRef, useState } from 'react';
import ludoboard from '../assets/ludoboard.jpg';
import { Socket } from 'socket.io-client';

type GameFormProps = {
    socket: Socket;
    isConnected: boolean;
};

const GameBoard = ({ socket, isConnected }: GameFormProps) => {
    const [pins, setPins] = useState([]);
    const [boardSize, setBoardSize] = useState({ w: 800, h: 800 });
    const boardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (boardRef.current) {
                const width = boardRef.current.offsetWidth;
                const height = boardRef.current.offsetHeight;
                console.log(width, height);

                setBoardSize({ w: width, h: height });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [
        boardRef,
        boardRef.current?.offsetHeight,
        boardRef.current?.offsetWidth,
    ]);

    return (
        <div
            ref={boardRef}
            className='flex justify-center items-center relative max-h-[800px] max-w-[800px] mx-auto'
        >
            <img className='w-full' src={ludoboard} alt='Ludo Board' />
            {pins.map((pin, i) => (
                <div
                    key={i}
                    className={`absolute bg-red-200 rounded-full`}
                    style={{
                        width: `${(boardSize.w / 12) * 0.5}px`,
                        height: `${(boardSize.w / 12) * 0.5}px`,
                        left: `${(pin.x / 100) * boardSize.w}px`,
                        top: `${(pin.y / 100) * boardSize.w}px`,
                    }}
                >
                    {/* Pin representation */}
                    <div className='w-full h-full rounded-full'></div>
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
