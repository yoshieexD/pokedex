<script lang="ts">
    import Header from "../../components/+header.svelte";
    import ky from "ky";
    import { BaseUrl } from "../../api/api";
    import Loading from "../../components/+loading.svelte";
    import { onMount } from "svelte";
    import GuessCard from "../../components/+guessCard.svelte";

    let pokemons: any[] = [];
    let currentPokemonIndex: number = 0;
    let currentPokemon: any = null;
    let userGuess: string = "";
    let score: number = 0;
    let showResult: boolean = false;
    let resultMessage: string = "";

    const url = `${BaseUrl}/pokemon?limit=30`;

    async function fetchData() {
        try {
            const response: any = await ky.get(url).json();
            const allPokemons = response.results;
            pokemons = getRandomPokemons(allPokemons, 7);
            currentPokemon = pokemons[currentPokemonIndex];
        } catch (error) {
            console.error("Failed to fetch Pokémon", error);
        }
    }

    function getRandomPokemons(pokemons: any[], count: number): any[] {
        const shuffled = [...pokemons].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function handleGuess() {
        if (userGuess.toLowerCase() === currentPokemon.name) {
            score++;
            resultMessage = "Correct!";
        } else {
            resultMessage = `Wrong! It was ${currentPokemon.name}.`;
        }
        showResult = true;
        setTimeout(() => {
            showResult = false;
            nextPokemon();
        }, 2000);
    }

    function nextPokemon() {
        currentPokemonIndex++;
        if (currentPokemonIndex < pokemons.length) {
            currentPokemon = pokemons[currentPokemonIndex];
            userGuess = "";
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        resultMessage = `Quiz over! Your score: ${score}/${pokemons.length}`;
        showResult = true;
    }

    onMount(fetchData);
</script>

<div
    class={`absolute w-full h-full inset-0 bg-sky-200/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] `}
>
    <Header />
    <div class="flex flex-col items-center justify-center h-full p-4">
        {#if currentPokemon}
            <GuessCard>
                <div class="space-y-4">
                    <p class="font-bold text-xl">Who's this pokemon?</p>
                    <div>
                        <input
                            type="text"
                            bind:value={userGuess}
                            placeholder="Guess the name"
                            class="mt-4 p-2 border border-gray-300 rounded"
                        />
                        <button
                            on:click={handleGuess}
                            class="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div class="bg-gray-400 rounded-bl-full">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.url.split("/").filter(Boolean).pop()}.png`}
                        alt="Guess the Pokémon"
                    />
                </div>
            </GuessCard>
            {#if showResult}
                <div class="mt-4 p-4 bg-white rounded shadow">
                    <p>{resultMessage}</p>
                </div>
            {/if}
        {:else if pokemons.length > 0}
            <Loading />
        {:else}
            <Loading />
        {/if}
    </div>
</div>
