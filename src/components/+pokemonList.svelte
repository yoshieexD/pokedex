<script lang="ts">
    import Card from "./+card.svelte";
    import { formatPokemonId } from "../utils/numberConverter";
    import Pokeball from "../assets/pokeball.png";
    import { cardTheme, type cardType } from "../theme/theme";

    export let pokemons: { id: number; name: string; type: cardType }[] = [];
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-4 w-[78%] mx-auto">
    {#each pokemons as { id, name, type }, index (index)}
        <Card href={`/pokemon/${name}`}>
            <div class="flex justify-center relative">
                <div
                    class={`w-full flex justify-center ${cardTheme[type]} rounded-bl-[50%] rounded-t-lg`}
                >
                    <div
                        class="flex justify-center bg-gray-100/10 rounded-full"
                    >
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                            alt={name}
                            class="mb-2 w-[50%] z-10"
                        />
                    </div>
                    <img
                        src={Pokeball}
                        alt="pokeball"
                        class="w-[40px] h-[40px] absolute right-[5%] top-[5%] opacity-65"
                    />
                </div>
            </div>
            <div class="flex flex-col items-center justify-center pb-4">
                <p class="font-bold text-xs text-gray-500">
                    {formatPokemonId(id)}
                    {type}
                </p>
                <p
                    class="text-md tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-700"
                >
                    {name}
                </p>
            </div>
        </Card>
    {/each}
</div>
