<script>
    export let href = "";
</script>

<a
    {href}
    class="shadow-xl hover:shadow-sky-300/20 border border-gray-200 mr-4 mb-3 flex flex-col justify-center cursor-pointer rounded-xl bg-white hover:border-sky-500 hover:border-2"
>
    <slot />
</a>
