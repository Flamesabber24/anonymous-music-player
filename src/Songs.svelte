<script>
  import { onDestroy } from "svelte";
  import { songs } from "./stores";
  import Song from "./Song.svelte";
  import Prompt from "./Prompt.svelte";

  const comparator = (a, b) => a > b;

  let songsObj;

  const unsubscribe = songs.subscribe((songs) => {
    songsObj = JSON.parse(songs);
  });

  let songsList = [];
  for (const song of Object.keys(songsObj)) {
    songsList.push(song);
  }

  songsList.sort(comparator);

  const removeSong = (res, name) => {
    if (res === true) {
      delete songsObj[name];

      songsList = songsList.filter((value, index, arr) => value != name);

      songs.subscribe((songs) => {
        localStorage.songs = JSON.stringify(songsObj);
      });
    }
  };

  const handleSongAdded = (event) => {
    songsObj = event.detail.songs;

    let newSong = Object.keys(songsObj);
    newSong = newSong[newSong.length - 1];

    songsList.push(newSong);
    songsList.sort(comparator);
    songsList = songsList;
  };

  onDestroy(unsubscribe);
</script>

<div class="flex min-w-fit flex-col items-center content-around">
  <h3 class="text-2xl bg-zinc-900 text-white w-full z-10 text-center">Songs</h3>
  <div class="bg-gray-200 overflow-scroll songs">
    {#each songsList as song (song)}
      <div class="border-b-2 border-gray-300 flex flex-row pl-3">
        <Song
          name={song}
          on:remove={({ detail }) => removeSong(detail, song)}
        />
      </div>
    {/each}
  </div>

  <div style="height: 10px;" />

  <Prompt on:songAdded={handleSongAdded} />
</div>

<style>
  .songs {
    height: 358px;
  }
</style>
