<script lang="ts">
    import { onMount } from "svelte";
    import ky from "ky";
    import Card from "./+card.svelte";

    interface Pokemon {
        name: string;
        url: string;
        imageUrl: string;
    }

    interface PokeAPIResponse {
        results: { name: string; url: string }[];
    }

    interface PokemonDetails {
        sprites: {
            front_default: string;
        };
    }

    export let pokemons: Pokemon[] = [];

    const url = "https://pokeapi.co/api/v2/pokemon?limit=50";

    onMount(async () => {
        const data = await ky.get(url).json<PokeAPIResponse>();
        const detailedData = await Promise.all(
            data.results.map(async ({ name, url }) => {
                const details = await ky.get(url).json<PokemonDetails>();
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

<div class="grid sm:grid-cols-2 md:grid-cols-4 bg-white w-[70%] mx-auto">
    {#each pokemons as { name, imageUrl }, index (index)}
        <Card>
            <img src={imageUrl} alt={name} class="mb-2" />
            <p class="text-md">{name}</p>
        </Card>
    {/each}
</div>
