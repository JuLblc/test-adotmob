"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("../utils/utils"));
const matchPointOfInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Initialiaztion
    body.map((pointOfInterest) => {
        pointOfInterest.clicks = 0;
        pointOfInterest.impressions = 0;
    });
    const events = yield utils_1.default.getEvents();
    events.map((eventToMatched) => {
        let distances = [];
        body.map((pointOfInterest, idx) => {
            let distanceInfo = {
                distance: utils_1.default.getDistance(pointOfInterest.lat, pointOfInterest.lon, eventToMatched.lat, eventToMatched.lon, "K"),
                name: pointOfInterest.name,
            };
            // Keep only the smallest distance
            if (distances.length === 0) {
                distances.push(distanceInfo);
            }
            else if (distanceInfo.distance < distances[0].distance) {
                distances.push(distanceInfo); //element ajouter à la fin du tableau
                distances.shift(); //supp 1er element du tableau
            }
            // When all distances has been calculated
            if (idx === body.length - 1) {
                // Find the index of the smallest distance
                let indexOf = body.findIndex((el) => el.name === distances[0].name);
                // Incrementation according to eventType
                if (eventToMatched.eventType === "imp") {
                    body[indexOf].impressions++;
                }
                else if (eventToMatched.eventType === "click") {
                    body[indexOf].clicks++;
                }
            }
        });
    });
    // Building the response
    let response = {};
    body.map((pointOfInterest) => {
        response[pointOfInterest.name] = pointOfInterest;
    });
    res.status(200).json({ response });
});
exports.default = { matchPointOfInterest };
