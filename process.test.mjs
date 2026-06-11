import assert from "node:assert";
import test from "node:test";
import {
  getFridayNightEvents,
  getLongestStreak,
  getEveryDaySongs,
  getMostListenedSongByCount,
} from "./process.mjs";

test("getFridayNightEvents returns only Friday 5pm to Saturday 4am", () => {
  const events = [
    { song_id: "song-1", timestamp: "2024-01-05T18:00:00" },
    { song_id: "song-2", timestamp: "2024-01-05T10:00:00" },
    { song_id: "song-3", timestamp: "2024-01-06T02:00:00" },
    { song_id: "song-4", timestamp: "2024-01-06T05:00:00" },
  ];
  const result = getFridayNightEvents(events);
  assert.equal(result.length, 2);
  assert.equal(result[0].song_id, "song-1");
  assert.equal(result[1].song_id, "song-3");
});

test("getLongestStreak returns correct song and count", () => {
  const events = [
    { song_id: "a" },
    { song_id: "b" },
    { song_id: "b" },
    { song_id: "b" },
    { song_id: "a" },
  ];
  const result = getLongestStreak(events);
  assert.equal(result.length, 1);
  assert.equal(result[0].songId, "b");
  assert.equal(result[0].count, 3);
});

test("getEveryDaySongs returns songs listened to on every day", () => {
  const events = [
    { song_id: "a", timestamp: "2024-01-01T10:00:00" },
    { song_id: "b", timestamp: "2024-01-01T11:00:00" },
    { song_id: "a", timestamp: "2024-01-02T10:00:00" },
  ];
  const result = getEveryDaySongs(events);
  assert.equal(result.length, 1);
  assert.equal(result[0], "a");
});

test("getMostListenedSongByCount returns most played song", () => {
  const events = [
    { song_id: "a" },
    { song_id: "b" },
    { song_id: "a" },
    { song_id: "a" },
  ];
  assert.equal(getMostListenedSongByCount(events), "a");
});
