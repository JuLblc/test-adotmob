"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const pointsOfInterest_routes_1 = __importDefault(require("./routes/pointsOfInterest.routes"));
dotenv_1.default.config();
const router = (0, express_1.default)();
/** Logging */
router.use((0, morgan_1.default)("dev"));
/** Parse the request */
router.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express_1.default.json());
/** Routes */
router.use("/", pointsOfInterest_routes_1.default);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
/** Server */
const httpServer = http_1.default.createServer(router);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
