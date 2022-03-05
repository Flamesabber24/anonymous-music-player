<script context="module">
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () =>
    window.dispatchEvent(new Event("YouTubeIframeAPIReady"));
</script>

<script>
  import { createEventDispatcher } from "svelte";
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
    event.target.loadVideoById(videoId, 0, "small");
  };

  const onPlayerStateChange = ({ data }) => {
    dispatch("StateChange", data);

    if (data == 0)
    {
      player.loadVideoById("9nRvqemGydw", 0, "small");
    }
  };

  export const playVideo = () => {
    player.playVideo();
  };
</script>

<div id="player" class="player" />
