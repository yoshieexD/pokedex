<script lang="ts">
    import PokemonList from "../components/+pokemonList.svelte";
    import Input from "../components/+input.svelte";
</script>

<div>
    <div class="text-3xl font-bold mb-4">Pokedex</div>
    <Input type="text" placeholder="Search..." />
    <PokemonList />
</div>
