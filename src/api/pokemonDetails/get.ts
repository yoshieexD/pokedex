import ky from "ky";
import { BaseUrl } from "../api";
import type { PokemonData, EvolutionData } from "../pokemonDetails/interface";

export async function fetchPokemonData(slug: string): Promise<PokemonData> {
    const response = await ky.get(`${BaseUrl}/pokemon/${slug}`);
    const data: any = await response.json();
    const types = data.types.map((type: any) => type.type.name);
    const abilities = data.abilities.map((ability: any) => ability.ability.name);
    const baseStats = data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
    }));
    const [speciesResponse, typeResponse] = await Promise.all([
        ky.get(`${BaseUrl}/pokemon-species/${data.id}`),
        ky.get(`${BaseUrl}/type/${types[0]}`)
    ]);

    const speciesData: any = await speciesResponse.json();
    const descriptionEntry = speciesData.flavor_text_entries.find((entry: any) => entry.language.name === "en");
    const description = descriptionEntry ? descriptionEntry.flavor_text : "No description available";

    const evolutionChainResponse = await ky.get(speciesData.evolution_chain.url);
    const evolutionChainData: any = await evolutionChainResponse.json();

    const typeData: any = await typeResponse.json();
    const strengths = typeData.damage_relations.double_damage_to.map((type: any) => type.name);
    const weaknesses = typeData.damage_relations.double_damage_from.map((type: any) => type.name);
    const evolutionChain: EvolutionData[] = [];
    let chain = evolutionChainData.chain;
    const evolutionPromises: Promise<any>[] = [];

    while (chain) {
        evolutionPromises.push(ky.get(`${BaseUrl}/pokemon/${chain.species.name}`).json());
        chain = chain.evolves_to[0];
    }

    const evolutionResults = await Promise.all(evolutionPromises);
    evolutionResults.forEach((pokemonData: any) => {
        evolutionChain.push({
            name: pokemonData.species.name,
            imageUrl: pokemonData.sprites.front_default,
        });
    });

    return {
        id: data.id,
        name: data.name,
        weight: data.weight,
        height: data.height,
        types,
        abilities,
        baseStats,
        description,
        strengths,
        weaknesses,
        evolutionChain,
    };
}
