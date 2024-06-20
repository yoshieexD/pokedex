<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ky from "ky";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";
    import { BaseUrl } from "../../../api/api";
    import type { PokemonType } from "../../../theme/theme";

    interface EvolutionData {
        name: string;
        imageUrl: string;
    }

    interface PokemonData {
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

    let slug = $page.params.slug;
    let isLoading = true;

    let pokemon: PokemonData | null = null;
    let strengths: PokemonType[] = [];
    let weaknesses: PokemonType[] = [];
    let evolutionChain: EvolutionData[] = [];

    onMount(async () => {
        try {
            const response = await ky.get(`${BaseUrl}/pokemon/${slug}`);
            const data: any = await response.json();
            const types = data.types.map((type: any) => type.type.name);
            const abilities = data.abilities.map(
                (ability: any) => ability.ability.name,
            );
            const baseStats = data.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.base_stat,
            }));
            const speciesResponse = await ky.get(
                `${BaseUrl}/pokemon-species/${data.id}`,
            );
            const speciesData: any = await speciesResponse.json();
            const descriptionEntry = speciesData.flavor_text_entries.find(
                (entry: any) => entry.language.name === "en",
            );
            const evolutionChainResponse = await ky.get(
                speciesData.evolution_chain.url,
            );
            const evolutionChainData: any = await evolutionChainResponse.json();

            const description = descriptionEntry
                ? descriptionEntry.flavor_text
                : "No description available";

            const typeResponse = await ky.get(`${BaseUrl}/type/${types[0]}`);
            const typeData: any = await typeResponse.json();

            strengths = typeData.damage_relations.double_damage_to.map(
                (type: any) => type.name,
            );
            weaknesses = typeData.damage_relations.double_damage_from.map(
                (type: any) => type.name,
            );

            evolutionChain = [];
            let chain = evolutionChainData.chain;
            while (chain) {
                const pokemonResponse = await ky.get(
                    `${BaseUrl}/pokemon/${chain.species.name}`,
                );
                const pokemonData: any = await pokemonResponse.json();
                const imageUrl = pokemonData.sprites.front_default;
                evolutionChain.push({
                    name: chain.species.name,
                    imageUrl: imageUrl,
                });
                chain = chain.evolves_to[0];
            }

            setTimeout(() => {
                pokemon = {
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
                isLoading = false;
            }, 1000);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    });
</script>

<div
    class={`w-full h-screen ${isLoading ? "flex items-center justify-center" : ""}`}
>
    {#if isLoading}
        <Loading className="w-[30%] h-[30%]" />
    {:else}
        <PokemonDetails {pokemon} />
    {/if}
</div>
