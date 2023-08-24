"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_1 = require("./data");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8888;
app.use(body_parser_1.default.json());
// const moviess = JSON.parse(
//     fs.readFileSync(`${__dirname}/data.ts`)
// );
// get
app.get("/movies", (req, res) => {
    res.json({
        message: "Success",
        movies: data_1.movies,
    });
});
// create
app.post("/movies", (req, res) => {
    const insert = {
        id: data_1.movies.length + 1,
        title: req.body.title,
        description: req.body.description,
    };
    data_1.movies.push(insert);
    res.status(201).json({
        message: "Success",
        insert,
    });
});
// view by id
app.get("/movies/:id", (req, res) => {
    const spice = data_1.movies.filter((item) => {
        return item.id == req.params.id;
    });
    if (spice.length != 0) {
        res.json({
            message: "Success",
            spice,
        });
    }
    else {
        res.status(404).json({
            message: "Failed",
        });
    }
});
// updated
app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movIndex = data_1.movies.findIndex((p) => p.id === id);
    if (movIndex !== -1) {
        const updatedMov = {
            id,
            title: req.body.title,
            description: req.body.description,
        };
        data_1.movies[movIndex] = updatedMov;
        res.json({
            message: "Success",
            updatedMov,
        });
    }
    else {
        res.status(404).json({
            message: 'Not Found'
        });
    }
});
// delete
app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movIndex = data_1.movies.findIndex((p) => p.id === id);
    if (movIndex !== -1) {
        const deletedmov = data_1.movies.splice(movIndex, 1)[0];
        res.json({
            message: "Success",
            deletedmov,
        });
    }
    else {
        res.status(404).json({
            message: 'Your title is Not Found'
        });
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http:localhost:${port}`);
});
