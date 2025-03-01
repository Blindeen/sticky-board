import { Coords } from '../model/coords.model';

interface Note {
    id: number;
    title: string;
    description: string;
    leftCornerCoords: Coords;
}

export type { Note };
