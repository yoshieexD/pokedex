<script>
    export let href ="";
</script>

<a
    href={href}
    class="border border-gray-200 mr-2 mb-2 flex flex-col items-center justify-center cursor-pointer"
>
    <slot />
</a>
