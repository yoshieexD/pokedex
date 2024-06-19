<!-- Main component -->
<script lang="ts">
    import Card from "./+card.svelte";

    export let pokemons: { id: number; name: string; imageUrl: string }[] = [];

    function formatPokemonId(id: number): string {
        return id.toString().padStart(3, "0");
    }
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-4 bg-white w-[70%] mx-auto">
    {#each pokemons as { id, name, imageUrl }, index (index)}
        <Card href={`/pokemon/${name}`}>
            <p>#{formatPokemonId(id)}</p>
            <img src={imageUrl} alt={name} class="mb-2" />
            <p class="text-md">{name}</p>
        </Card>
    {/each}
</div>
