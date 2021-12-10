import utils from "./utils";
import { EventToMatched } from "../types";

describe("Get Distances", () => {
  test("getDistance returns a positiv number", () => {
    let lat1: number = 2;
    let lat2: number = 2.5;
    let lon1: number = -38;
    let lon2: number = -38.5;
    let unit: string = "K";

    let dist: number;
    dist = utils.getDistance(lat1, lat2, lon1, lon2, unit);

    expect(dist).toBeGreaterThanOrEqual(0.0);
  });
});

describe("Get Events", () => {
  test("getEvents should return an array with 223.994 elements", async () => {
    const events: EventToMatched[] = await utils.getEvents();

    expect(events.length).toBe(223994); // Check if .csv is read entirely
  });
});
