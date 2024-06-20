<script>
    export let href = "";
</script>

<a
    {href}
    class="shadow-xl hover:shadow-sky-300/20 border border-gray-200 mr-4 mb-3 flex flex-col justify-center cursor-pointer rounded-xl bg-white transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110"
>
    <slot />
</a>
