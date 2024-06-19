export type PokemonType =
    | "grass"
    | "fire"
    | "water"
    | "electric"
    | "bug"
    | "normal"
    | "poison"
    | "ground"
    | "psychic"
    | "ghost"
    | "rock"
    | "fairy"
    | "ice"
    | "steel"
    | "dragon"
    | "flying"
    | "dark";


export const btn: Record<PokemonType, string> = {
    grass: "bg-green-500 shadow-lg shadow-green-500/50",
    fire: "bg-red-500 shadow-lg shadow-red-500/50",
    water: "bg-blue-500 shadow-lg shadow-blue-500/50",
    electric: "bg-yellow-500 shadow-lg shadow-yellow-500/50",
    bug: "bg-lime-500 shadow-lg shadow-lime-500/50",
    normal: "bg-gray-500  shadow-lg shadow-gray-500/50",
    poison: "bg-purple-500 shadow-lg shadow-purple-500/50",
    ground: "bg-yellow-700 shadow-lg shadow-yellow-700/50",
    psychic: "bg-pink-500 shadow-lg shadow-pink-500/50",
    ghost: "bg-indigo-500 shadow-lg shadow-indigo-500/50",
    rock: "bg-yellow-800 shadow-lg shadow-yellow-800/50",
    fairy: "bg-pink-300 shadow-lg shadow-pink-300/50",
    ice: "bg-blue-300 shadow-lg shadow-blue-300/50",
    steel: "bg-gray-400 shadow-lg shadow-gray-400/50",
    dragon: "bg-indigo-700 shadow-lg shadow-indigo-700/50",
    dark: "bg-gray-800 shadow-lg shadow-gray-800/50",
    flying: "bg-sky-500 shadow-lg shadow-sky-500/50",
};