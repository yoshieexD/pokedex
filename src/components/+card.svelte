<script>
    export let href = "";
</script>

<a
    {href}
    class="border border-gray-200 mr-2 mb-2 flex flex-col justify-center cursor-pointer rounded-xl p-4 bg-white"
>
    <slot />
</a>
