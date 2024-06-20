<!-- PokemonPage.svelte -->
<script lang="ts">
    import { type PokemonType, btn } from "../theme/theme";
    import ky from "ky";
    import { BaseUrl } from "../api/api";
    import Overview from "./+overview.svelte";
    import Stats from "./+stats.svelte";
    import Header from "./+header.svelte";
    interface EvolutionData {
        name: string;
        imageUrl: string;
    }
    export let pokemon: {
        id: number;
        name: string;
        weight: number;
        height: number;
        types: PokemonType[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        description: string;
        strengths: PokemonType[];
        weaknesses: PokemonType[];
        evolutionChain?: EvolutionData[];
    } | null;

    const handleBack = async () => {
        if (pokemon && pokemon.id > 1) {
            let backId = pokemon.id - 1;
            const res = await ky.get(`${BaseUrl}/pokemon/${backId}`);
            const data: any = await res.json();
            window.location.href = `/pokemon/${data.name}`;
        }
    };

    const handleNext = async () => {
        if (pokemon) {
            let nextId = pokemon.id + 1;
            const res = await ky.get(`${BaseUrl}/pokemon/${nextId}`);
            const data: any = await res.json();
            window.location.href = `/pokemon/${data.name}`;
        }
    };

    const handleGotoEvolution = async (name: string) => {
        if (name) {
            window.location.href = `/pokemon/${name}`;
        }
    };
</script>

{#if pokemon}
    <div
        class={`absolute w-full h-full  inset-0 w-full bg-sky-200/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] `}
    >
        <Header />
        <div class="w-full flex items-center justify-center">
            <div
                class="xxs:w-[5%] sm:w-[10%] flex justify-start xxs:px-2 sm:px-8"
            >
                {#if pokemon.id !== 1}
                    <button
                        on:click={handleBack}
                        class=" sm:text-3xl font-semibold lg:text-6xl"
                        >{"<"}</button
                    >
                {/if}
            </div>
            <div
                class="grid xxs:grid-cols-1 sm:grid-cols-2 sm:space-x-16 xxs:w-[95%] sm:w-[90%] items-center"
            >
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    class="xxs:w-full sm:w-full"
                />
                <div
                    class="absolute xxs:top-[30%] hover:bg-gray-400/70 cursor-pointer sm:top-[20%] sm:left-[2%] md:top-[30%] lg:top-[30%] lg:left-[15%] bg-gray-600/30 rounded-md py-2 px-6 border border-gray-200/20"
                >
                    <p class="text-white md:text-2xl lg:text-4xl">
                        {pokemon.height} feet.
                    </p>
                </div>
                <div
                    class="absolute xxs:top-[60%] hover:bg-gray-400/70 cursor-pointer xxs:left-[50%] sm:top-[40%] md:top-[60%] sm:left-[20%] md:left-[30%] bg-gray-600/30 rounded-md py-2 px-6 border border-gray-200/20"
                >
                    <p class="text-white md:text-2xl lg:text-4xl">
                        {pokemon.weight} kgs.
                    </p>
                </div>
                <div
                    class="space-y-4 w-full flex flex-col xxs:items-center sm:items-start"
                >
                    <p
                        class="xxs:text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold"
                    >
                        {pokemon.name}
                    </p>
                    <div>
                        <Overview
                            types={pokemon.types}
                            description={pokemon.description}
                        />
                        <div>
                            {#if pokemon.evolutionChain}
                                <div
                                    class="flex xxs:justify-center sm:justify-start"
                                >
                                    {#each pokemon.evolutionChain as evolution}
                                        <button
                                            on:click={() =>
                                                handleGotoEvolution(
                                                    evolution.name,
                                                )}
                                            class="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
                                        >
                                            <img
                                                src={evolution.imageUrl}
                                                alt={evolution.name}
                                                class="w-24 h-24"
                                            />
                                        </button>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="xxs:w-[5%] sm:w-[10%] flex justify-end xxs:px-2 sm:px-8"
            >
                <button
                    on:click={handleNext}
                    class="sm:text-3xl font-semibold lg:text-6xl">{">"}</button
                >
            </div>
        </div>
        <!-- next row -->
        <div class="  w-full flex justify-center pb-8">
            <div class="grid xxs:grid-cols-1 sm:grid-cols-2 w-[80%]">
                <div class="space-y-4">
                    <p class="text-xl font-semibold text-gray-400">Stats</p>
                    <Stats baseStats={pokemon.baseStats} />
                </div>
                <div class="grid grid-cols-1">
                    <!--Abilities-->
                    <div class="space-y-4 px-4">
                        <p class="text-xl font-semibold text-gray-400">
                            Abilities
                        </p>
                        <div class="grid xxs:grid-cols-2 md:grid-cols-3">
                            {#each pokemon.abilities as ability}
                                <button
                                    class="bg-gray-800 shadow-lg shadow-gray-800/50 text-white rounded-md py-2 px-6 text-sm font-semibold m-4"
                                    >{ability}</button
                                >
                            {/each}
                        </div>
                    </div>

                    <!--weaknesses and strength-->
                    <div class="grid grid-cols-1">
                        <div class="space-y-4 px-4">
                            <p class="text-xl font-semibold text-gray-400">
                                Strength against
                            </p>
                            <div class="grid xxs:grid-cols-2 md:grid-cols-3">
                                {#each pokemon.strengths as strength}
                                    <button
                                        class={`${btn[strength]} text-white rounded-md h-8 px-6 text-sm font-semibold m-4`}
                                        >{strength}</button
                                    >
                                {/each}
                            </div>
                        </div>

                        <div class="space-y-2 px-4">
                            <p class="text-xl font-semibold text-gray-400">
                                Weak against
                            </p>
                            <div
                                class="grid xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
                            >
                                {#each pokemon.weaknesses as weak}
                                    <button
                                        class={`${btn[weak]} text-white rounded-md h-8 px-6 text-sm font-semibold m-4`}
                                        >{weak}</button
                                    >
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
