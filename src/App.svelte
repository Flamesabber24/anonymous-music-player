<script>
  import YouTube from "./YouTube.svelte";
  import Songs from "./Songs.svelte";
  import Title from "./Title.svelte";
</script>

<div class="h-screen w-screen m-0 bg-fuchsia-900">
  <Title />

  <div class="flex justify-evenly max-w-fit m-auto mt-5">
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
