<script lang="ts">
    import Card from "./+card.svelte";

    export let pokemons: any[] = [];

    function handleClick(name: string) {
        alert(`Button clicked for ${name}!`);
    }
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-4 bg-white w-[70%] mx-auto">
    {#each pokemons as { name, imageUrl }, index (index)}
        <Card href={`/pokemon/${name}`}>
            <img src={imageUrl} alt={name} class="mb-2" />
            <p class="text-md">{name}</p>
        </Card>
    {/each}
</div>
