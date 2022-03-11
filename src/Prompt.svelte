<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import { dialogs } from "svelte-dialogs";
  import { songs } from "./stores";

  let songsList;

  const dispatch = createEventDispatcher();

  const unsubscribe = songs.subscribe((songs) => {
    songsList = JSON.parse(songs);
  });

  const handlePrompt = (arr) => {
    songsList[arr[0]] = arr[1];

    songs.subscribe(
      (value) => (localStorage.songs = JSON.stringify(songsList))
    );

    dispatch("songAdded", {
      songs: JSON.parse(localStorage.songs),
    });
  };

  onDestroy(unsubscribe);
</script>

<button
  on:click={() =>
    dialogs.prompt(["Enter song name", "Paste song link"]).then(handlePrompt)}
  >Add new song</button
>
