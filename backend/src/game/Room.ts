import { Player } from './Player';

export class Room {
    id: string;
    players: Player[];
    private maxPlayers: number = 4;
    private currentTurn: number = 0;

    constructor(id: string) {
        this.id = id;
        this.players = [];
    }
    addPlayer(id: string, name: string) {
        const player = new Player(id, name);
        if (this.players.length < this.maxPlayers) {
            this.players.push(player);
            return true;
        }
        return false;
    }
    rollDice(): number {
        return Math.floor(Math.random() * 6) + 1;
    }
    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }
    getCurrentPlayer(): Player {
        return this.players[this.currentTurn];
    }
}
