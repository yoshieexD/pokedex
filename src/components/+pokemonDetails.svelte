<!-- PokemonPage.svelte -->
<script lang="ts">
    import { type PokemonType, btn } from "../theme/theme";
    import ky from "ky";
    import { BaseUrl } from "../api/api";
    import Overview from "./+overview.svelte";
    import Stats from "./+stats.svelte";

    export let pokemon: {
        id: number;
        name: string;
        weight: number;
        types: PokemonType[];
        abilities: string[];
        baseStats: { name: string; value: number }[];
        description: string;
        strengths: PokemonType[];
        weaknesses: PokemonType[];
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
</script>

{#if pokemon}
    <div
        class={`absolute w-full h-full  inset-0 w-full bg-sky-200/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] `}
    >
        <div class="w-full flex items-center justify-center">
            <div class="w-[10%] flex justify-start px-8">
                {#if pokemon.id !== 1}
                    <button on:click={handleBack} class="text-3xl font-semibold"
                        >{"<"}</button
                    >
                {/if}
            </div>
            <div
                class="grid xxs:grid-cols-1 sm:grid-cols-2 space-x-16 w-[80%] items-center"
            >
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    class="xxs:w-[80%] sm:w-full"
                />
                <div class="space-y-4">
                    <p class="xxs:text-3xl sm:text-4xl md:text-5xl font-bold">
                        {pokemon.name}
                    </p>
                    <div>
                        <Overview
                            types={pokemon.types}
                            description={pokemon.description}
                        />
                    </div>
                </div>
            </div>
            <div class="w-[10%] flex justify-end px-8">
                <button on:click={handleNext} class="text-3xl font-semibold"
                    >{">"}</button
                >
            </div>
        </div>
        <!-- next row -->
        <div class="  w-full flex justify-center">
            <div class="grid xxs:grid-cols-1 sm:grid-cols-2 w-[80%]">
                <div class="space-y-4">
                    <p class="text-xl font-semibold">Stats</p>
                    <Stats baseStats={pokemon.baseStats} />
                </div>
                <div class="grid grid-cols-1">
                    <!--Abilities-->
                    <div class="space-y-4 px-4">
                        <p class="text-xl font-semibold">Abilities</p>
                        <div class="grid xxs:grid-cols-2 md:grid-cols-3">
                            {#each pokemon.abilities as ability}
                                <button
                                    class="bg-gray-800 shadow-lg shadow-gray-800/50 text-white rounded-md h-8 px-6 text-sm font-semibold m-4"
                                    >{ability}</button
                                >
                            {/each}
                        </div>
                    </div>

                    <!--weaknesses and strength-->
                    <div class="grid grid-cols-1">
                        <div class="space-y-4 px-4">
                            <p class="text-xl font-semibold">
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
                            <p class="text-xl font-semibold">Weak against</p>
                            <div class="grid xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
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
