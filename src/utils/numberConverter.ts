export function formatPokemonId(id: number): string {
    return id.toString().padStart(3, "0");
}