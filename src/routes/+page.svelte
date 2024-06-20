<script lang="ts">
    import ky from "ky";
    import { onMount, afterUpdate } from "svelte";
    import PokemonList from "../components/+pokemonList.svelte";
    import Search from "../components/+search.svelte";
    import Loading from "../components/+loading.svelte";
    import { BaseUrl } from "../api/api";
    import type { PokemonType } from "../theme/theme";
    import Header from "../components/+header.svelte";

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

    let pokemons: { id: number; name: string; type: PokemonType }[] = [];

    async function fetchData(query: string, limit?: number, offset?: number) {
        try {
            isLoading = true;
            let url = query
                ? `${BaseUrl}/pokemon/?limit=1000`
                : `${BaseUrl}/pokemon/?limit=${limit}&offset=${offset}`;

            if (
                query === "secret_alpha_key" ||
                query === "secret_numeric_key"
            ) {
                url = `${BaseUrl}/pokemon/?limit=150`;
            }
            const data: PokeAPIResponse = await ky.get(url).json();
            if (query) {
                let results = data.results;

                if (
                    query !== "secret_alpha_key" &&
                    query !== "secret_numeric_key" &&
                    query !== ""
                ) {
                    results = results.filter((pokemon) =>
                        pokemon.name
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                    );
                } else if (query === "secret_alpha_key") {
                    results = results.sort((a, b) =>
                        alphabetSorting
                            ? b.name.localeCompare(a.name, "en", {
                                  sensitivity: "base",
                              })
                            : a.name.localeCompare(b.name, "en", {
                                  sensitivity: "base",
                              }),
                    );
                }
                const detailedData = await Promise.all(
                    results.map(async (poke) => {
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
                if (query === "secret_numeric_key") {
                    detailedData.sort((a, b) => {
                        return digitSorting ? b.id - a.id : a.id - b.id;
                    });
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
        let query = "";
        if (type === "alpha") {
            alphabetSorting = !alphabetSorting;
            query = "secret_alpha_key";
        } else if (type === "numeric") {
            digitSorting = !digitSorting;
            query = "secret_numeric_key";
        }
        fetchData(query);
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
        fetchData("");
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
        <Header />
        <div class="flex justify-center">
            <p
                class="text-center xxs:w-[80%] sm:w-[50%] text-gray-700 font-medium"
            >
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
            <button
                class={`text-gray-400 flex space-x-2`}
                on:click={() => handleSort("alpha")}
            >
                <p>name:</p>
                {#if alphabetSorting}
                    <p class="text-red-400 font-bold">desc</p>
                {:else}
                    <p class="text-green-400 font-bold">asc</p>
                {/if}
            </button>
            <button
                class={`text-gray-400 flex space-x-2`}
                on:click={() => handleSort("numeric")}
            >
                <p>id:</p>
                {#if digitSorting}
                    <p class="text-red-400 font-bold">desc</p>
                {:else}
                    <p class="text-green-400 font-bold">asc</p>
                {/if}
            </button>
        </div>
    </div>
    <br />
    <PokemonList {pokemons} />
    {#if isLoading}
        <Loading />
    {/if}
</div>
