// let songs;

// function getSongs() {
//   fetch("songs.txt")
//     .then(response => response.text())
//     .then(res => songs = res);
// }

// getSongs();

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
async function onYouTubeIframeAPIReady() {
  let songs = (await (await fetch("songs.txt")).text()).split("\n");
  console.log(songs);

  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: songs[getRandomIndex(songs)],
    playerVars: {
      "playinline": 1
    },
    events: {
      "onReady": onPlayerReady,
      "onStateChange": onPlayerStateChange
    }
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      player.loadVideoById(songs[getRandomIndex(songs)], 0);
    }
  }
}