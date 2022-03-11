<script>
  import { playSong } from "./stores";
  import { dialogs } from "svelte-dialogs";
  import { createEventDispatcher } from "svelte";

  export let name;

  const dispatch = createEventDispatcher();

  const whetherToRemove = (res) => {
    dispatch("remove", res);
  };

  function play() {
    playSong.update((_) => name);
  }
</script>

<div class="flex justify-between w-64 songName">
  <button class="border-none basis-10/12 text-left py-1" on:click={play}>
    {name}
  </button>
  <button
    class="remove border-none basis-2/12 hover:bg-red-200"
    on:click={() =>
      dialogs
        .confirm("Do you want to delete the song?")
        .then((res) => whetherToRemove(res))}>X</button
  >
</div>

<style>
  .remove {
    display: none;
  }

  .songName:hover .remove {
    display: inline;
  }
</style>
