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

<div class="flex justify-center">
    <div class=" bg-white w-[76%] rounded-md py-3 px-4 shadow-lg">
        <input
            type="text"
            {placeholder}
            bind:value
            on:input={handleChange}
            class="appearance-none border-none text-sm rounded-md placeholder-gray-400 text-gray-400 font-semibold focus:outline-none w-full"
        />
    </div>
</div>
