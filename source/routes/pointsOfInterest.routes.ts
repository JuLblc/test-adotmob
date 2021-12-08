import express from "express";
import controller from "../controllers/pointsOfInterest.controller";
const router = express.Router();

router.get("/", controller.routeTest);

export = router;
