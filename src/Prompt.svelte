<script>
  import { onDestroy, createEventDispatcher } from "svelte";
  import { dialogs } from "svelte-dialogs";
  import { songs } from "./stores";
  import Plus from "svelte-material-icons/Plus.svelte";

  let songsList;

  const dispatch = createEventDispatcher();

  const unsubscribe = songs.subscribe((songs) => {
    songsList = JSON.parse(songs);
  });

  const handlePrompt = (arr) => {
    const regex = /\?v=[a-zA-Z0-9_-]{11}/g;
    arr[1] = arr[1].match(regex)[0].substr(3);
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
  class="bg-fuchsia-700 text-zinc-50 p-0.5 px-2"
  on:click={() =>
    dialogs.prompt(["Enter song name", "Paste song link"]).then(handlePrompt)}
>
  <Plus />
</button>
