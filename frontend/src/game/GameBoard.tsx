import { useEffect, useRef, useState } from 'react';
import ludoboard from '../assets/ludoboard.jpg';
import { Socket } from 'socket.io-client';

type GameFormProps = {
    socket: Socket;
    isConnected: boolean;
};

const startingPosition = {
    blue: {
        1: { x: 11.4, y: 84.4 },
        2: { x: 24.8, y: 84.4 },
        3: { x: 11.4, y: 71.1 },
        4: { x: 24.8, y: 71.1 },
    },
    red: {
        1: { x: 11.4, y: 11.4 },
        2: { x: 24.8, y: 11.4 },
        3: { x: 11.4, y: 24.8 },
        4: { x: 24.8, y: 24.8 },
    },
    green: {
        1: { x: 84.4, y: 11.4 },
        2: { x: 71.1, y: 11.4 },
        3: { x: 84.4, y: 24.8 },
        4: { x: 71.1, y: 24.8 },
    },
    yellow: {
        1: { x: 84.4, y: 84.4 },
        2: { x: 71.1, y: 84.4 },
        3: { x: 84.4, y: 71.1 },
        4: { x: 71.1, y: 71.1 },
    },
};

type PinsType = (1 | 2 | 3 | 4)[];
type Colors = 'red' | 'blue' | 'green' | 'yellow';

const GameBoard = ({ socket, isConnected }: GameFormProps) => {
    const [pins, setPins] = useState<PinsType>([1, 2, 3, 4]);
    const [color, setColor] = useState<Colors>('yellow');
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
                        left: `${
                            (startingPosition[color][pin].x / 100) * boardSize.w
                        }px`,
                        top: `${
                            (startingPosition[color][pin].y / 100) * boardSize.w
                        }px`,
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
