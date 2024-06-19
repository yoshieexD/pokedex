<script lang="ts">
    import ky from "ky";
    import { onMount, afterUpdate } from "svelte";
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
    }

    let value = "";
    let isLoading = true;
    let isFetchingMore = false;
    export let pokemons: any[] = [];

    async function fetchData(query: string, limit?: number, offset?: number) {
        try {
            isLoading = true;
            const url = query
                ? `${BaseUrl}/?limit=1000`
                : `${BaseUrl}/?limit=${limit}&offset=${offset}`;
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
                        };
                    }),
                );
                pokemons = [...pokemons, ...detailedData];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            isLoading = false;
            isFetchingMore = false;
        }
    }

    function handleChange(event: any) {
        value = event.target.value.trim();
        fetchData(value);
    }

    async function fetchMoreData() {
        if (!isFetchingMore) {
            isFetchingMore = true;
            const limit = 30;
            const offset = pokemons.length;
            await fetchData(value, limit, offset);
        }
    }

    onMount(() => {
        fetchData("", 15, 0);
    });

    function handleScroll() {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            fetchMoreData();
        }
    }

    afterUpdate(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div
    class="relative w-full h-full overflow-hidden inset-0 w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] p-4"
>
    <div class="text-center">
        <div class="text-4xl font-bold mb-">Pokedex</div>
        <div>
            <Search placeholder="Search..." {value} oninput={handleChange} />
        </div>
    </div>
    <br />
    <PokemonList {pokemons} />
    {#if isLoading}
        <Loading />
    {/if}
</div>
