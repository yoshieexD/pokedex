<script>
    import Pikachu from "../assets/pikachu.gif";
    export let className = "";
</script>

<div class="flex flex-col items-center justify-center">
    <img
        src={Pikachu}
        alt="Pikachu Loading"
        class={`${className ? className : "w-[40px] h-[40px]"}`}
    />
    <p>Loading...</p>
</div>
