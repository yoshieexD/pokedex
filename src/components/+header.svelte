<script>
    import { page } from "$app/stores";
    function goHome() {
        window.location.href = `/`;
    }
    function goHabitat() {
        window.location.href = `/quiz`;
    }
</script>

<div class="flex flex-col items-center bg-gray-400 rounded-bl-full">
    <div class="flex">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
            alt="Charizard"
            class=" w-[100px]"
        />
        <h1 class="xxs:text-6xl sm:text-6xl md:text-7xl font-bold text-white">
            Pokédex
        </h1>
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="Pikachu"
            class=" w-[100px] xxs:hidden xs:flex"
        />
    </div>

    <div class="space-x-4 mt-[-9px] pb-2">
        <button class="text-gray-300" on:click={() => goHome()}>Home</button>
        <button class="text-gray-300" on:click={() => goHabitat()}
            >Quiz game</button
        >
    </div>
</div>
