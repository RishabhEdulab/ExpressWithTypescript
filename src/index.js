"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 4000;
const app = (0, express_1.default)();
app.get("/", (request, response) => {
    response.status(200).send({ status: "success", message: "get data from database..." });
});
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
