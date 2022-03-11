<script context="module">
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () =>
    window.dispatchEvent(new Event("YouTubeIframeAPIReady"));
</script>

<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { songs, playSong } from "./stores";

  $: $playSong, playThisSong();

  let songsList;

  const unsubscribe = songs.subscribe((songs) => {
    songsList = JSON.parse(songs);
  });

  function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  const songIds = Object.values(songsList);

  onDestroy(unsubscribe);

  const dispatch = createEventDispatcher();

  export let videoId;

  let player;

  window.addEventListener("YouTubeIframeAPIReady", () => {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  });

  const onPlayerReady = (event) => {
    event.target.loadVideoById(videoId, 0);
  };

  const onPlayerStateChange = ({ data }) => {
    dispatch("StateChange", data);

    if (data == 0) {
      player.loadVideoById(songIds[getRandomIndex(songIds)], 0);
    }
  };

  const playThisSong = () => {
    if ($playSong !== "") {
      player.loadVideoById(songsList[$playSong], 0);
    }
  };

  export const playVideo = () => {
    player.playVideo();
  };

  const nextVideo = () => {
    player.loadVideoById(songIds[getRandomIndex(songIds)], 0);
  };

  const pauseVideo = () => {
    player.pauseVideo();
  }
</script>

<div class="flex flex-col items-center">
  <div id="player" class="player" />

  <div style="height: 10px;" />

  <div class="flex justify-evenly w-full">
    <button class="bg-cyan-700 text-zinc-50 p-0.5 px-2.5" on:click={pauseVideo}
      >Pause Video</button
    >

    <button
      class="bg-cyan-700 text-zinc-50 p-0.5 px-2.5"
      on:click={() => player.playVideo()}>Play Video</button
    >

    <button class="bg-cyan-700 text-zinc-50 p-0.5 px-2.5" on:click={nextVideo}
      >Next Video</button
    >
  </div>
</div>
