<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ky from "ky";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";
    import { BaseUrl } from "../../../api/api";

    let slug = $page.params.slug;

    let pokemon: any | null = null;

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
            pokemon = {
                id: data.id,
                name: data.name,
                weight: data.weight,
                types,
                abilities,
                baseStats,
                description,
            };
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    });
</script>

<div class="w-full h-screen">
    {#if pokemon}
        <PokemonDetails {pokemon} />
    {:else}
        <Loading />
    {/if}
</div>
