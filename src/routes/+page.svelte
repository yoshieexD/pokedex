<script lang="ts">
    import ky from "ky";
    import { onMount } from "svelte";
    import PokemonList from "../components/+pokemonList.svelte";
    import Search from "../components/+search.svelte";
    import Loading from "../components/+loading.svelte";
    import { BaseUrl } from "../api/api";

    interface PokeAPIResponse {
        sprites: any;
        id: number;
        name: string;
        results: { name: string; url: string }[];
        next: string | null;
    }

    interface PokemonDetails {
        id: number;
        name: string;
        sprites: {
            front_default: string;
        };
    }

    let value = "";
    let isLoading = true;
    export let pokemons: any[] = [];

    async function fetchData(query: string) {
        try {
            isLoading = true;
            const url = query
                ? `${BaseUrl}/?limit=1000`
                : `${BaseUrl}/?limit=30`;
            const data: PokeAPIResponse = await ky.get(url).json();
            if (query) {
                const filteredData = data.results.filter((poke) =>
                    poke.name.toLowerCase().includes(query.toLowerCase()),
                );
                const detailedData = await Promise.all(
                    filteredData.map(async (poke) => {
                        const details = await ky
                            .get(poke.url)
                            .json<PokemonDetails>();
                        return {
                            id: details.id,
                            name: poke.name,
                            url: poke.url,
                            imageUrl: details.sprites.front_default,
                        };
                    }),
                );
                pokemons = detailedData;
            } else {
                const detailedData = await Promise.all(
                    data.results.map(async ({ name, url }) => {
                        const details = await ky
                            .get(url)
                            .json<PokemonDetails>();
                        return {
                            id: details.id,
                            name,
                            url,
                            imageUrl: details.sprites.front_default,
                        };
                    }),
                );
                pokemons = detailedData;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            isLoading = false;
        }
    }

    function handleChange(event: any) {
        value = event.target.value.trim();
        fetchData(value);
    }

    onMount(() => {
        fetchData("");
    });
</script>

<div>
    <div class="text-3xl font-bold mb-4">Pokedex</div>
    <Search placeholder="Search..." {value} oninput={handleChange} />
    {#if isLoading}
        <Loading />
    {:else}
        <PokemonList {pokemons} />
    {/if}
</div>
