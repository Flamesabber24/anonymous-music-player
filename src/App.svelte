<script>
  import YouTube from "./YouTube.svelte";
  import Prompt from "./Prompt.svelte";

  let videoState;
  let player;
</script>

<div class="player">
  <YouTube
    videoId="btWnZxF-Hck"
    on:StateChange={({ detail }) => (videoState = detail)}
    bind:this={player}
  />

  <br>

  <button on:click={() => player.playVideo()}>Play Video</button>

  <p>{videoState}</p>

  <Prompt />
</div>

<style>
  .player {
    text-align: center;
  }
</style>
