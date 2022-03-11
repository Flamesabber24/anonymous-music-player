<script>
  import YouTube from "./YouTube.svelte";
  import Songs from "./Songs.svelte";

  let videoState;
  let player;
</script>

<div class="h-screen w-screen m-0 pt-24">
  <div class="flex justify-evenly max-w-fit m-auto">
    <Songs />

    <div style="width: 100px;" />

    <YouTube
      videoId="btWnZxF-Hck"
      on:StateChange={({ detail }) => (videoState = detail)}
      bind:this={player}
    />
  </div>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
