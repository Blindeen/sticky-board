import { Coords } from '../model/coords.model';

interface Note {
    id: number;
    text: string;
    leftCornerCoords: Coords;
}

export type { Note };
