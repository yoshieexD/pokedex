import type { PokemonType } from "../../theme/theme";

export interface EvolutionData {
    name: string;
    imageUrl: string;
}

export interface PokemonData {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: PokemonType[];
    abilities: string[];
    baseStats: { name: string; value: number }[];
    description: string;
    strengths: PokemonType[];
    weaknesses: PokemonType[];
    evolutionChain?: EvolutionData[];
}
