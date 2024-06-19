<!-- Main component -->
<script lang="ts">
    import Card from "./+card.svelte";
    import { formatPokemonId } from "../utils/numberConverter";
    export let pokemons: { id: number; name: string }[] = [];
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-4 w-[70%] mx-auto">
    {#each pokemons as { id, name }, index (index)}
        <Card href={`/pokemon/${name}`}>
            <p class="text-white">{formatPokemonId(id)}</p>
            <div class="flex justify-center">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={name}
                    class="mb-2 w-[55%]"
                />
            </div>
            <div class="flex justify-center">
                <p class="text-md font-semibold text-white">{name}</p>
            </div>
        </Card>
    {/each}
</div>
