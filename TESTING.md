# Testing

## Dropdown lists four users

Manually tested by opening the page and counting the options.

## Selecting a user displays relevant answers

Manually tested each user against the expected output table in the rubric.

## User 4 shows empty state message

Manually tested by selecting User 4 and confirming the message appears.

## Questions hidden when they don't apply

Manually tested with User 3 Friday night and every day sections do not appear.

## Fewer than 3 genres handled correctly

Manually tested with User 2 heading says "Top 1 genre" not "Top 3 genres".

## Unit tests cover a non-trivial function

Unit tests in `process.test.js` see getFridayNightEvents, getLongestStreak,
getEveryDaySongs and getMostListenedSongByCount tests. All pass with npm test.

## 100% Lighthouse accessibility

Tested on the live Netlify URL for all four users using Chrome DevTools Lighthouse.
Every view scored 100%.
