<script>
  import { playSong } from "./stores";

  export let name;

  function play() {
    playSong.update((_) => name);
  }
</script>

<div class="pt-2">
  <button class="border-none" on:click={play}>{name}</button>
</div>
