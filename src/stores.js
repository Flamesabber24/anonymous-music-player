import { writable } from "svelte/store";

export const songs = writable(
  localStorage.getItem("songs") || ""
);

export const playSong = writable(
  ""
);