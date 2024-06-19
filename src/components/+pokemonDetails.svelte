<script lang="ts">
    import { type PokemonType, btn } from "../theme/theme";
    export let pokemon: {
        id: number;
        name: string;
        weight: number;
        types: PokemonType[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        description: string;
    } | null;
</script>

<div
    class="absolute inset-0 h-full w-full bg-sky-200/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
>
    {#if pokemon}
        <div class="flex justify-center sm:overflow-hidden">
            <div
                class="grid xxs:grid-cols-1 sm:grid-cols-2 sm:space-x-16 w-[70%]"
            >
                <div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}
                        class="xxs:w-[80%] sm:w-full"
                    />
                </div>
                <div
                    class="flex flex-col justify-center space-y-4 xxs:items-center sm:items-start"
                >
                    <p class="xxs:text-3xl sm:text-4xl md:text-5xl font-bold">
                        {pokemon.name}
                    </p>
                    <div class="flex flex-col space-y-4">
                        <div class="cursor-pointer space-x-4">
                            {#each pokemon.types as type}
                                <button
                                    class={`text-white rounded-md h-8 px-6 text-md font-semibold ${btn[type] || "bg-gray-500 shadow-gray-500/50"}`}
                                >
                                    {type}
                                </button>
                            {/each}
                        </div>
                        <p class="text-gray-700">
                            {pokemon.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
