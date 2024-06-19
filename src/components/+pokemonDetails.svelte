<script lang="ts">
    export let pokemon: {
        id: number;
        name: string;
        weight: number;
        types: string[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
    } | null;
</script>

<div
    class="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
>
    {#if pokemon}
        <div class="flex justify-center">
            <div class="grid xxs:grid-cols-1 sm:grid-cols-2 space-x-16 mt-8">
                <div>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}
                        class="w-full"
                    />
                </div>

                <div class="flex flex-col justify-center items-center">
                    <p class="xs:text-5xl md:text-7xl font-bold text-green-700">
                        {pokemon.name}
                    </p>
                </div>
            </div>
        </div>
    {/if}
</div>
