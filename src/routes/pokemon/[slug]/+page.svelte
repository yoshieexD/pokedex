<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import ky from "ky";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";
    import { BaseUrl } from "../../../api/api";

    let slug = $page.params.slug;

    interface Pokemon {
        id: number;
        name: string;
        weight: number;
        types: string[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
    }

    let pokemon: Pokemon | null = null;

    onMount(async () => {
        try {
            const response = await ky.get(`${BaseUrl}/${slug}`);
            const data: any = await response.json();
            const types = data.types.map((type: any) => type.type.name);
            const abilities = data.abilities.map(
                (ability: any) => ability.ability.name,
            );
            const baseStats = data.stats.map((stat: any) => ({
                name: stat.stat.name,
                value: stat.base_stat,
            }));
            pokemon = {
                id: data.id,
                name: data.name,
                weight: data.weight,
                types,
                abilities,
                baseStats,
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
