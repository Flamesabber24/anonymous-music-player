<script>
  import YouTube from "./YouTube.svelte";
  import Songs from "./Songs.svelte";
</script>

<div class="h-screen w-screen m-0 pt-24 bg-sky-50">
  <div class="flex justify-evenly max-w-fit m-auto">
    <Songs />

    <div style="width: 100px;" />

    <YouTube videoId="btWnZxF-Hck" />
  </div>
</div>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
