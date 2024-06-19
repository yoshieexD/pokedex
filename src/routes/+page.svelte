<script lang="ts">
    import ky from "ky";
    import { onMount } from "svelte";
    import PokemonList from "../components/+pokemonList.svelte";
    import Input from "../components/+input.svelte";
    import Loading from "../components/+loading.svelte";
    interface PokeAPIResponse {
        results: { name: string; url: string }[];
    }
    interface PokemonDetails {
        sprites: {
            front_default: string;
        };
    }
    let isLoading = true;
    export let pokemons: any[] = [];
    const url = "https://pokeapi.co/api/v2/pokemon?limit=50";
    onMount(async () => {
        const data = await ky.get(url).json<PokeAPIResponse>();
        const detailedData = await Promise.all(
            data.results.map(async ({ name, url }) => {
                const details = await ky.get(url).json<PokemonDetails>();
                isLoading = false;
                return {
                    name,
                    url,
                    imageUrl: details.sprites.front_default,
                };
            }),
        );
        pokemons = detailedData;
    });
</script>

<div>
    <div class="text-3xl font-bold mb-4">Pokedex</div>
    <Input type="text" placeholder="Search..." />
    {#if isLoading}
        <Loading />
    {:else}
        <PokemonList {pokemons} />
    {/if}
</div>
