<script>
    export let placeholder = "";
    export let value = "";
    export let oninput = (/** @type {any} */ _event) => {};

    /**
     * @param {any} event
     */
    function handleChange(event) {
        oninput(event);
    }
</script>

<input
    type="text"
    {placeholder}
    bind:value
    on:input={handleChange}
    class="appearance-none border-none w-64 h-8 px-4 text-sm rounded-md bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:shadow-outline"
/>
