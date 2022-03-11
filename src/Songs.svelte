<script>
  import { onDestroy } from "svelte";
  import { songs } from "./stores";
  import Song from "./Song.svelte";
  import { dialogs } from "svelte-dialogs";
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
  <h3 class="text-2xl bg-zinc-900 text-white w-full pl-5">Songs</h3>
  <div class="bg-gray-200 pl-3">
    {#each songsList as song (song.id)}
      <div class="border-b-2 border-gray-300 flex flex-row">
        <Song name={song.name} />
        <div class="grow" />
        <div class="inline-block">
          <button
            class="ml-2 px-3 py-1 my-1 hover:bg-red-400 border-none rounded"
            on:click={() =>
              dialogs
                .confirm("Do you want to delete the song?")
                .then((res) => removeSong(res, song.id))}>X</button
          >
        </div>
      </div>
    {/each}
  </div>

  <div style="height: 10px;" />

  <Prompt on:songAdded={handleSongAdded} />
</div>
