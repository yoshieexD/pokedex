<!-- Stats.svelte -->
<script lang="ts">
    export let baseStats: { name: string; value: number }[] = [];
    console.log(baseStats);
</script>

<div class="flex flex-col space-y-4">
    {#each baseStats as stat}
        <div>
            <p
                class={`font-semibold ${stat.value > 70 ? "text-green-500" : stat.value > 30 ? "text-yellow-500" : "text-red-500"}`}
            >
                {stat.name}
            </p>
            <div class="h-3 bg-gray-200 rounded-full mb-2 relative">
                <div
                    class={`absolute h-full rounded-full ${stat.value > 70 ? "bg-green-500" : stat.value > 30 ? "bg-yellow-500" : "bg-red-500"} `}
                    style={`width:${stat.value > 100 ? "100%" : `${stat.value}%`}`}
                />
            </div>
            <div
                class={`text-xs text-end px-4  ${stat.value > 70 ? "text-green-500" : stat.value > 30 ? "text-yellow-500" : "text-red-500"} font-extrabold`}>
                {stat.value}
            </div>
        </div>
    {/each}
</div>
