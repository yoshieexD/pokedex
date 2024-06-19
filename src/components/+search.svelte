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

<input type="text" {placeholder} bind:value on:input={handleChange} />
