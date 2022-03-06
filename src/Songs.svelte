<script>
  import { onDestroy } from "svelte";
  import { songs } from "./stores";
  import Song from "./Song.svelte";
  import { XLg } from "svelte-bootstrap-icons";
  import { dialogs } from "svelte-dialogs";

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

  console.log(songsList);

  onDestroy(unsubscribe);
</script>

<ul>
  {#each songsList as song (song.id)}
    <li>
      <Song name={song.name} />
      <button
        on:click={() =>
          dialogs
            .confirm("Do you want to delete the song?")
            .then((res) => removeSong(res, song.id))}><XLg /></button
      >
    </li>
  {/each}
</ul>
