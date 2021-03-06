import cors from 'cors';
import express from 'express';
import todolist from './api/todolist.route.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/todolist', todolist);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}));

export default app;