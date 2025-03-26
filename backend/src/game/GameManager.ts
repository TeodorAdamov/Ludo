import { v4 } from 'uuid';
import { Room } from './Room';

export class GameManager {
    games: Map<string, Room>;

    constructor() {
        this.games = new Map();
    }
    createGame(gameName: string, password: string): string {
        const room = new Room(gameName, password);
        this.games.set(gameName, room);
        console.log(this.games);
        return gameName;
    }
    getGame(gameId: string): Room | undefined {
        return this.games.get(gameId);
    }
}
