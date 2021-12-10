import express from "express";
import controller from "../controllers/pointsOfInterest.controller";
const router = express.Router();

router.post("/point-of-interest", controller.matchPointOfInterest);

export = router;
