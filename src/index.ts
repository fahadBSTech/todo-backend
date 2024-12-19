import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ?? 3001;

app.use(bodyParser.json());

// POST /tasks
app.post("/tasks", async (req: Request, res: Response) => {
    const { title, color } = req.body;
    if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
    }
    try {
        const task = await prisma.task.create({ data: { title, color } });
        res.status(201).json(task);
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: `Failed to create task` });
    }
});

// GET /tasks
app.get("/tasks", async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany();
        const count = await prisma.task.count();
        res.json({ data: tasks, count });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: { ...req.body },
        });

        res.json(task);
    } catch (error) {
        res.status(404).json({ error: "Task not found" });
    }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({ where: { id: Number(id) } });
        res.status(204).send('Deleted Task Successfully');
    } catch (error) {
        res.status(404).json({ error: "Task not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
