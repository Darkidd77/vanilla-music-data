import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import {
  getMostListenedSongByCount,
  getMostListenedArtistByCount,
  getMostListenedSongByTime,
  getMostListenedArtistByTime,
  getFridayNightEvents,
  getLongestStreak,
  getEveryDaySongs,
  getTopGenres,
} from "./process.mjs";

const userSelect = document.getElementById("user-select");
const results = document.getElementById("results");

function populateDropdown() {
  getUserIDs().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });
}

userSelect.addEventListener("change", (event) => {
  const userId = event.target.value;
  results.innerHTML = "";
  if (!userId) return;

  const events = getListenEvents(userId);

  if (!events || events.length === 0) {
    const p = document.createElement("p");
    p.textContent = "This user didn't listen to any songs.";
    results.appendChild(p);
    return;
  }

  results.innerHTML = `<p>Found ${events.length} listen events.</p>`;
});

populateDropdown();
