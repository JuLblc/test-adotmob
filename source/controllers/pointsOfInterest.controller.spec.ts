import router from "../router";
import supertest from "supertest";

import { PointOfInterest } from "../types";

const request = supertest(router);

describe("POST / - Matching", () => {
  test("post points and interest", async () => {
    const body: PointOfInterest[] = [
      {
        lat: 48.8759992,
        lon: 2.3481253,
        name: "Arc de triomphe",
        impressions: 0,
        clicks: 0,
      },
      {
        lat: 48.86,
        lon: 2.35,
        name: "Chatelet",
        impressions: 0,
        clicks: 0,
      },
    ];
    const res = await request.post("/point-of-interest").send(body);

    const resChat: PointOfInterest = JSON.parse(res.text).response[
      body[0].name
    ];
    const resArc: PointOfInterest = JSON.parse(res.text).response[body[1].name];

    expect(res.status).toBe(200);

    expect(resChat.lat).toBe(body[0].lat);
    expect(resChat.lon).toBe(body[0].lon);
    expect(resChat.name).toBe(body[0].name);
    expect(resChat.impressions).toBeGreaterThanOrEqual(0.0);
    expect(resChat.clicks).toBeGreaterThanOrEqual(0.0);

    expect(resArc.lat).toBe(body[1].lat);
    expect(resArc.lon).toBe(body[1].lon);
    expect(resArc.name).toBe(body[1].name);
    expect(resArc.impressions).toBeGreaterThanOrEqual(0.0);
    expect(resArc.clicks).toBeGreaterThanOrEqual(0.0);
  });
});
