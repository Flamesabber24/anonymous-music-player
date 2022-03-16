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
    console.log(name);
  }
</script>

<div
  class="flex justify-between w-full songName hover:bg-fuchsia-300 song-container border-fuchsia-300"
>
  <button
    class="border-none basis-10/12 text-left py-1 pl-3 song"
    on:click={play}
  >
    {name}
  </button>
  <button
    class="remove border-none basis-2/12 hover:bg-gray-800 hover:text-fuchsia-50"
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

  .song-container {
    border-bottom-width: 0.5px;
  }

  .song {
    font-family: "Montserrat", sans-serif;
  }
</style>
