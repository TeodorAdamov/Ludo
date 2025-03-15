export class Player {
    id: string;
    name: string;
    pieces: number[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.pieces = [1, 1, 1, 1];
    }
    movePiece(pieceIndex: number, steps: number): boolean {
        if (this.pieces[pieceIndex] + steps <= 58) {
            this.pieces[pieceIndex] += steps;
            return true;
        }
        return false;
    }
}
