<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ky from "ky";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";

    let slug = $page.params.slug;
    const url = `https://pokeapi.co/api/v2/pokemon/${slug}`;

    interface Pokemon {
        name: string;
        weight: number;
        types: string[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        image: string;
    }

    let pokemon: Pokemon | null = null;

    onMount(async () => {
        try {
            const response = await ky.get(url);
            const data: any = await response.json();
            const types = data.types.map((type: any) => type.type.name);
            const abilities = data.abilities.map(
                (ability: any) => ability.ability.name,
            );
            const image = data.sprites.front_default;
            const baseStats = data.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.base_stat,
            }));
            pokemon = {
                name: data.name,
                weight: data.weight,
                types,
                abilities,
                baseStats,
                image,
            };
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
        }
    });
</script>

<div class="container mt-8">
    {#if pokemon}
        <PokemonDetails {pokemon} />
    {:else}
        <Loading />
    {/if}
</div>
