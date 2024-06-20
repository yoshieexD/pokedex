<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ky from "ky";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";
    import { BaseUrl } from "../../../api/api";
    import type { PokemonType } from "../../../theme/theme";

    interface PokemonData {
        id: number;
        name: string;
        weight: number;
        types: PokemonType[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        description: string;
        strengths: PokemonType[];
        weaknesses: PokemonType[];
    }

    let slug = $page.params.slug;
    let isLoading = true;

    let pokemon: PokemonData | null = null;
    let strengths: PokemonType[] = [];
    let weaknesses: PokemonType[] = [];

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
            setTimeout(() => {
                pokemon = {
                    id: data.id,
                    name: data.name,
                    weight: data.weight,
                    types,
                    abilities,
                    baseStats,
                    description,
                    strengths,
                    weaknesses,
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
        <Loading />
    {:else}
        <PokemonDetails {pokemon} />
    {/if}
</div>
