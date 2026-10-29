import { test } from "node:test";
import assert from "node:assert/strict";
import { site } from "../data/site";
import { groupHours, localClock, openStatus } from "../lib/hours";

const h = site.openingHours;
const LUN = 0, JEU = 3, VEN = 4, SAM = 5;
const at = (hh: number, mm = 0) => hh * 60 + mm;

test("opening hours match the restaurant's published schedule", () => {
  assert.deepEqual(
    h.map((d) => `${d.label} ${d.open}-${d.close}`),
    [
      "Lundi 12:00-01:00",
      "Mardi 12:00-01:00",
      "Mercredi 12:00-01:00",
      "Jeudi 12:00-01:00",
      "Vendredi 19:00-01:00",
      "Samedi 12:00-01:00",
      "Dimanche 12:00-01:00",
    ],
  );
});

test("open status handles midnight crossover and Friday evening opening", () => {
  assert.deepEqual(openStatus(h, LUN, at(13)), { open: true, closesAt: "01:00" });
  assert.deepEqual(openStatus(h, LUN, at(23, 59)), { open: true, closesAt: "01:00" });
  // Vendredi 00:30 : encore le service du jeudi soir.
  assert.deepEqual(openStatus(h, VEN, at(0, 30)), { open: true, closesAt: "01:00" });
  // Vendredi 13:00 : fermé, ouverture à 19:00.
  assert.deepEqual(openStatus(h, VEN, at(13)), { open: false, opensAt: "19:00", opensDay: "Vendredi", today: true });
  // Samedi 00:30 : service du vendredi soir.
  assert.equal(openStatus(h, SAM, at(0, 30)).open, true);
  // Lundi 03:00 : fermé, ouvre à 12:00.
  assert.deepEqual(openStatus(h, LUN, at(3)), { open: false, opensAt: "12:00", opensDay: "Lundi", today: true });
  assert.equal(openStatus(h, JEU, at(1)).open, false);
});

test("local clock uses the Algiers time zone", () => {
  // 2026-10-29T23:30:00Z = vendredi 30 octobre, 00:30 à Alger (UTC+1).
  assert.deepEqual(localClock(new Date("2026-10-29T23:30:00Z"), "Africa/Algiers"), { dayIndex: VEN, minutes: at(0, 30) });
});

test("hours are grouped for compact display", () => {
  assert.deepEqual(groupHours(h), [
    { days: "Lun – Jeu, Sam – Dim", hours: "12:00 – 01:00" },
    { days: "Vendredi", hours: "19:00 – 01:00" },
  ]);
});
