<script>
  import { onDestroy } from "svelte";
  import { songs } from "./stores";
  import Song from "./Song.svelte";
  import Prompt from "./Prompt.svelte";
  import Search from "./Search.svelte";
  import { playSong } from "./stores";

  const comparator = (a, b) => a > b;

  let songsObj;

  const unsubscribe = songs.subscribe((songs) => {
    songsObj = JSON.parse(songs);
  });

  let songsList = [];
  let filteredList;
  let isSearchApply = false;

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

  const onSearch = (res) => {
    if (res === "") isSearchApply = false;
    else isSearchApply = true;

    filteredList = songsList.filter((value, index, arr) => value.includes(res));
  };

  const onEnter = (res) => {
    let searchRes = songsList.filter((value, index, arr) =>
      value.includes(res)
    );

    if (searchRes.length === 1) {
      playSong.update((_) => searchRes[0]);
    }
  };

  onDestroy(unsubscribe);
</script>

<div
  class="flex min-w-fit flex-col items-center content-around songs-container"
>
  <h3
    class="text-2xl bg-fuchsia-700 text-fuchsia-100 w-full z-10 text-center"
    style="font-family: 'Montserrat', sans-serif;"
  >
    Songs
  </h3>
  <Search
    on:search={({ detail }) => onSearch(detail)}
    on:enter={({ detail }) => onEnter(detail)}
  />
  <div class="bg-fuchsia-200 overflow-scroll w-full songs font-serif">
    {#each isSearchApply ? filteredList : songsList as song (song)}
      <Song name={song} on:remove={({ detail }) => removeSong(detail, song)} />
    {/each}
  </div>

  <div style="height: 10px;" />

  <Prompt on:songAdded={handleSongAdded} />
</div>

<style>
  .songs {
    height: 325px;
  }

  .songs-container {
    width: 300px;
  }
</style>
