"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookRoute_1 = __importDefault(require("./app/routes/bookRoute"));
const db_1 = __importDefault(require("./app/config/db"));
const borrowRoute_1 = __importDefault(require("./app/routes/borrowRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://assignment-4-ph-l2-client.vercel.app'
}));
// main route
app.get('/', (req, res) => {
    res.send("Server Running.");
});
//application routes
app.use('/api/books', bookRoute_1.default);
app.use('/api/borrow', borrowRoute_1.default);
app.listen(port, () => {
    console.log("Server running on port: ", port);
});
