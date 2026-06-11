export function getMostByCount(items, keyFn) {
  const counts = {};
  items.forEach((item) => {
    const key = keyFn(item);
    if (key) counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function getMostListenedSongByCount(listenEvents) {
  return getMostByCount(listenEvents, (e) => e.song_id);
}

export function getMostListenedArtistByCount(listenEvents, getSongFn) {
  return getMostByCount(
    listenEvents,
    (e) => getSongFn(e.song_id)?.artist || null,
  );
}

export function getMostListenedSongByTime(listenEvents, getSongFn) {
  const times = {};
  listenEvents.forEach((e) => {
    const song = getSongFn(e.song_id);
    if (!song) return;
    times[e.song_id] = (times[e.song_id] || 0) + (song.duration_seconds || 0);
  });
  return Object.entries(times).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function getMostListenedArtistByTime(listenEvents, getSongFn) {
  const times = {};
  listenEvents.forEach((e) => {
    const song = getSongFn(e.song_id);
    if (!song) return;
    times[song.artist] =
      (times[song.artist] || 0) + (song.duration_seconds || 0);
  });
  return Object.entries(times).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function getFridayNightEvents(listenEvents) {
  return listenEvents.filter((e) => {
    const date = new Date(e.timestamp);
    const day = date.getDay();
    const hour = date.getHours();
    return (day === 5 && hour >= 17) || (day === 6 && hour < 4);
  });
}

export function getLongestStreak(listenEvents) {
  if (listenEvents.length === 0) return [];

  let bestCount = 0;
  let bestSongs = [];
  let currentSong = listenEvents[0].song_id;
  let currentCount = 1;

  for (let i = 1; i < listenEvents.length; i++) {
    if (listenEvents[i].song_id === currentSong) {
      currentCount++;
    } else {
      if (currentCount > bestCount) {
        bestCount = currentCount;
        bestSongs = [currentSong];
      } else if (currentCount === bestCount) {
        bestSongs.push(currentSong);
      }
      currentSong = listenEvents[i].song_id;
      currentCount = 1;
    }
  }

  if (currentCount > bestCount) {
    bestCount = currentCount;
    bestSongs = [currentSong];
  } else if (currentCount === bestCount) {
    bestSongs.push(currentSong);
  }

  return bestSongs.map((songId) => ({ songId, count: bestCount }));
}

export function getEveryDaySongs(listenEvents) {
  if (listenEvents.length === 0) return [];

  const dayMap = {};
  listenEvents.forEach((e) => {
    const day = new Date(e.timestamp).toDateString();
    if (!dayMap[day]) dayMap[day] = new Set();
    dayMap[day].add(e.song_id);
  });

  const allDays = Object.values(dayMap);
  const totalDays = allDays.length;
  const songDayCounts = {};

  allDays.forEach((daySongs) => {
    daySongs.forEach((songId) => {
      songDayCounts[songId] = (songDayCounts[songId] || 0) + 1;
    });
  });

  return Object.entries(songDayCounts)
    .filter(([, count]) => count === totalDays)
    .map(([songId]) => songId);
}

export function getTopGenres(listenEvents, getSongFn) {
  const counts = {};
  listenEvents.forEach((e) => {
    const song = getSongFn(e.song_id);
    if (!song?.genre) return;
    counts[song.genre] = (counts[song.genre] || 0) + 1;
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([genre]) => genre);
}
