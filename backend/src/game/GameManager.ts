import { v4 } from 'uuid';
import { Room } from './Room';

export class GameManager {
    games: Map<string, Room>;

    constructor() {
        this.games = new Map();
    }
    createGame(): string {
        const gameId = v4();
        const room = new Room(gameId);
        this.games.set(gameId, room);
        return gameId;
    }
    getGame(gameId: string): Room | undefined {
        return this.games.get(gameId);
    }
}
