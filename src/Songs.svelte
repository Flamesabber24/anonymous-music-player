<script>
  import { onDestroy } from "svelte";
  import { songs } from "./stores";
  import Song from "./Song.svelte";
  import Prompt from "./Prompt.svelte";

  let songsObj;

  const unsubscribe = songs.subscribe((songs) => {
    songsObj = JSON.parse(songs);
  });

  let i = 0;
  let songsList = [];
  for (const song of Object.keys(songsObj)) {
    songsList.push({ id: i, name: song });
    i++;
  }

  const removeSong = (res, id) => {
    if (res === true) {
      delete songsObj[songsList[id].name];

      songsList.splice(id, 1);
      songsList = songsList;

      songs.subscribe((songs) => {
        localStorage.songs = JSON.stringify(songsObj);
      });
    }
  };

  const handleSongAdded = (event) => {
    songsObj = event.detail.songs;

    let newSong = Object.keys(songsObj);
    newSong = newSong[newSong.length - 1];

    songsList = [...songsList, { id: i, name: newSong }];
    i++;
  };

  onDestroy(unsubscribe);
</script>

<div class="flex min-w-fit flex-col items-center content-around">
  <h3 class="text-2xl bg-zinc-900 text-white w-full z-10 text-center">Songs</h3>
  <div class="bg-gray-200 overflow-scroll songs">
    {#each songsList as song (song.id)}
      <div class="border-b-2 border-gray-300 flex flex-row pl-3">
        <Song
          name={song.name}
          on:remove={({ detail }) => removeSong(detail, song.id)}
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