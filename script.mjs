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

// turns a songId into "Artist - Title"
function formatSong(songId) {
  const song = getSong(songId);
  return `${song.artist} - ${song.title}`;
}

// creates a <section> with an <h2> and a content element inside
function createSection(heading, content) {
  const section = document.createElement("section");
  const h2 = document.createElement("h2");
  h2.textContent = heading;
  section.appendChild(h2);
  section.appendChild(content);
  return section;
}

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

  // Q1 — Most listened song by count
  const topSongByCount = getMostListenedSongByCount(events);
  if (topSongByCount) {
    const p = document.createElement("p");
    p.textContent = formatSong(topSongByCount);
    results.appendChild(createSection("Most listened song (by count)", p));
  }

  // Q4 — Most listened song by time
  const topSongByTime = getMostListenedSongByTime(events, getSong);
  if (topSongByTime) {
    const p = document.createElement("p");
    p.textContent = formatSong(topSongByTime);
    results.appendChild(createSection("Most listened song (by time)", p));
  }

  // Q2 — Most listened artist by count
  const topArtistByCount = getMostListenedArtistByCount(events, getSong);
  if (topArtistByCount) {
    const p = document.createElement("p");
    p.textContent = topArtistByCount;
    results.appendChild(createSection("Most listened artist (by count)", p));
  }

  // Q4 — Most listened artist by time
  const topArtistByTime = getMostListenedArtistByTime(events, getSong);
  if (topArtistByTime) {
    const p = document.createElement("p");
    p.textContent = topArtistByTime;
    results.appendChild(createSection("Most listened artist (by time)", p));
  }

  // Q3 — Friday nights (hidden completely if no Friday events)
  const fridayEvents = getFridayNightEvents(events);
  if (fridayEvents.length > 0) {
    const fridaySongByCount = getMostListenedSongByCount(fridayEvents);
    const fridaySongByTime = getMostListenedSongByTime(fridayEvents, getSong);

    if (fridaySongByCount) {
      const p = document.createElement("p");
      p.textContent = formatSong(fridaySongByCount);
      results.appendChild(
        createSection("Most listened on Friday nights (by count)", p),
      );
    }

    if (fridaySongByTime) {
      const p = document.createElement("p");
      p.textContent = formatSong(fridaySongByTime);
      results.appendChild(
        createSection("Most listened on Friday nights (by time)", p),
      );
    }
  }

  // Q5 — Longest streak
  const streaks = getLongestStreak(events);
  if (streaks.length > 0) {
    const p = document.createElement("p");
    p.textContent = streaks
      .map((s) => `${formatSong(s.songId)} (${s.count} times in a row)`)
      .join(", ");
    results.appendChild(createSection("Longest streak", p));
  }

  // Q6 — Every day songs (hidden if none qualify)
  const everyDay = getEveryDaySongs(events);
  if (everyDay.length > 0) {
    const ul = document.createElement("ul");
    everyDay.forEach((songId) => {
      const li = document.createElement("li");
      li.textContent = formatSong(songId);
      ul.appendChild(li);
    });
    results.appendChild(createSection("Listened to every day", ul));
  }

  // Q7 — Top genres
  const genres = getTopGenres(events, getSong);
  if (genres.length > 0) {
    const count = genres.length;
    const heading = count === 1 ? "Top genre" : `Top ${count} genres`;
    const ul = document.createElement("ul");
    genres.forEach((genre) => {
      const li = document.createElement("li");
      li.textContent = genre;
      ul.appendChild(li);
    });
    results.appendChild(createSection(heading, ul));
  }
});

populateDropdown();
