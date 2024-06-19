<script lang="ts">
    export let pokemon: {
        name: string;
        weight: number;
        types: string[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        image: string;
    } | null;
</script>

<div>
    {#if pokemon}
        <img src={pokemon.image} alt={pokemon.name} />
        <h1 class="text-3xl font-bold mb-4">{pokemon.name}</h1>
        <p class="text-lg mb-2">Weight: {pokemon.weight}</p>

        <h2 class="text-xl font-bold mt-4 mb-2">Types:</h2>
        <ul>
            {#each pokemon.types as type}
                <li>{type}</li>
            {/each}
        </ul>

        <h2 class="text-xl font-bold mt-4 mb-2">Abilities:</h2>
        <ul>
            {#each pokemon.abilities as ability}
                <li>{ability}</li>
            {/each}
        </ul>

        <h2 class="text-xl font-bold mt-4 mb-2">Base Stats:</h2>
        <ul>
            {#each pokemon.baseStats as stat}
                <li>{stat.name}: {stat.value}</li>
            {/each}
        </ul>
    {/if}
</div>
