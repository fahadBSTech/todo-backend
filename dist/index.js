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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3001;
app.use(body_parser_1.default.json());
// POST /tasks
app.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, color } = req.body;
    if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
    }
    try {
        const task = yield prisma.task.create({ data: { title, color } });
        res.status(201).json(task);
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: `Failed to create task` });
    }
}));
// GET /tasks
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        const count = yield prisma.task.count();
        res.json({ data: tasks, count });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
}));
// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield prisma.task.update({
            where: { id: Number(id) },
            data: Object.assign({}, req.body),
        });
        res.json(task);
    }
    catch (error) {
        res.status(404).json({ error: "Task not found" });
    }
}));
// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.task.delete({ where: { id: Number(id) } });
        res.status(204).send('Deleted Task Successfully');
    }
    catch (error) {
        res.status(404).json({ error: "Task not found" });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
