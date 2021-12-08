"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const pointsOfInterest_controller_1 = __importDefault(require("../controllers/pointsOfInterest.controller"));
const router = express_1.default.Router();
router.get("/", pointsOfInterest_controller_1.default.routeTest);
module.exports = router;
