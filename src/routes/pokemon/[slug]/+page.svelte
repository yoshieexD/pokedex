<!-- src/routes/PokemonDetailPage.svelte -->
<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import Loading from "../../../components/+loading.svelte";
    import PokemonDetails from "../../../components/+pokemonDetails.svelte";
    import { fetchPokemonData } from "../../../api/pokemonDetails/get";
    import type { PokemonData } from "../../../api/pokemonDetails/interface";

    let slug = $page.params.slug;
    let isLoading = true;
    let pokemon: PokemonData | null = null;

    onMount(async () => {
        try {
            pokemon = await fetchPokemonData(slug);
            isLoading = false;
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
