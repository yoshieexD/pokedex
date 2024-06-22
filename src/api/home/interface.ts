import type { PokemonType } from "../../theme/theme";

export interface PokeAPIResponse {
    sprites: any;
    id: number;
    name: string;
    results: {
        id: number;
        name: string;
        url: string;
    }[];
    next: string | null;
}

export interface PokemonDetails {
    types: { type: { name: PokemonType } }[];
    id: number;
    name: string;
}