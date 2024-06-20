<!-- PokemonDetails.svelte -->
<script lang="ts">
    import { type PokemonType, btn } from "../theme/theme";

    export let types: PokemonType[] = [];
    export let description: string = "";
</script>

<div class="flex flex-col space-y-4">
    <div
        class="cursor-pointer space-x-4 flex xxs:justify-center sm:justify-start"
    >
        {#each types as type}
            <button
                class={`text-white rounded-md h-8 px-6 text-md font-semibold ${btn[type] || "bg-gray-500 shadow-gray-500/50"}`}
            >
                {type}
            </button>
        {/each}
    </div>
    <p class="text-gray-700 xxs:text-center sm:text-start md:text-xl lg:text-3xl">{description}</p>
</div>
