<script lang="ts">
    import ky from "ky";
    import { onMount, afterUpdate } from "svelte";
    import PokemonList from "../components/+pokemonList.svelte";
    import Search from "../components/+search.svelte";
    import Loading from "../components/+loading.svelte";
    import { BaseUrl } from "../api/api";
    import type { PokemonType } from "../theme/theme";

    interface PokeAPIResponse {
        sprites: any;
        id: number;
        name: string;
        results: {
            id: number;
            name: string;
            url: string;
        }[];
        next: string | null;
    }

    interface PokemonDetails {
        types: { type: { name: PokemonType } }[];
        id: number;
        name: string;
    }

    let value = "";
    let isLoading = true;
    let isFetchingMore = false;
    let alphabetSorting: boolean = false;
    let digitSorting: boolean = false;

    export let pokemons: { id: number; name: string; type: PokemonType }[] = [];

    async function fetchData(query: string, limit?: number, offset?: number) {
        try {
            isLoading = true;
            const url = query
                ? `${BaseUrl}/pokemon/?limit=1000`
                : `${BaseUrl}/pokemon/?limit=${limit}&offset=${offset}`;
            const data: PokeAPIResponse = await ky.get(url).json();

            if (query) {
                const filteredData = data.results.filter((poke) => {
                    const pokeId = (poke.url.match(/\/(\d+)\/$/) || [])[1];
                    return (
                        poke.name.toLowerCase().includes(query.toLowerCase()) ||
                        (pokeId && pokeId === query.toLowerCase().trim()) ||
                        (pokeId &&
                            pokeId.padStart(query.length, "0") ===
                                query.toLowerCase().trim())
                    );
                });

                const detailedData = await Promise.all(
                    filteredData.map(async (poke) => {
                        const details = await ky
                            .get(poke.url)
                            .json<PokemonDetails>();
                        const type = details.types.map(
                            (type) => type.type.name,
                        )[0];
                        return {
                            id: details.id,
                            name: poke.name,
                            url: poke.url,
                            type: type,
                        };
                    }),
                );

                if (alphabetSorting) {
                    detailedData.sort((a, b) => a.name.localeCompare(b.name));
                }

                pokemons = detailedData;
            } else {
                const detailedData = await Promise.all(
                    data.results.map(async ({ name, url }) => {
                        const details = await ky
                            .get(url)
                            .json<PokemonDetails>();
                        const type = details.types.map(
                            (type) => type.type.name,
                        )[0];
                        return {
                            id: details.id,
                            name,
                            url,
                            type: type,
                        };
                    }),
                );
                if (alphabetSorting) {
                    detailedData.sort((a, b) => a.name.localeCompare(b.name));
                }
                pokemons = [...pokemons, ...detailedData];
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            isLoading = false;
            isFetchingMore = false;
        }
    }

    function handleSort(type: string) {
        if (type === "alpha") {
            alphabetSorting = !alphabetSorting;
        } else if (type === "numeric") {
            digitSorting = !digitSorting;
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
    class={`${value ? "absolute" : "relative"} w-full h-full overflow-hidden inset-0 w-full bg-sky-200/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] `}
>
    <div class="text-center xxs:space-y-4 md:space-y-16">
        <div class="flex justify-center bg-gray-400 rounded-bl-full">
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                alt="Charizard"
                class=" w-[100px]"
            />
            <h1
                class="xxs:text-6xl sm:text-6xl md:text-7xl font-bold text-white"
            >
                Pokédex
            </h1>
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="Pikachu"
                class=" w-[100px]"
            />
        </div>
        <div class="flex justify-center">
            <p class="text-center w-[50%] text-gray-700 font-mediuma">
                Unleash your inner Pokémon Master with our ultimate Pokédex!
                Discover, collect, and battle your favorite Pokémon in a world
                where adventure awaits!
            </p>
        </div>
        <div>
            <Search
                placeholder="Search your pokemon!"
                {value}
                oninput={handleChange}
            />
        </div>
    </div>
    <br />
    <div class="flex justify-center">
        <div class="w-[77%] flex space-x-2">
            <button class="" on:click={() => handleSort("alpha")}
                >Name:
                {#if alphabetSorting}
                    [Z-a]
                {:else}
                    [A-z]
                {/if}
            </button>
            <button class="" on:click={() => handleSort("numeric")}
                >Id:
                {#if digitSorting}
                    [1000-001]
                {:else}
                    [001-1000]
                {/if}</button
            >
        </div>
    </div>
    <br />
    <PokemonList {pokemons} />
    {#if isLoading}
        <Loading />
    {/if}
</div>
