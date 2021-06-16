import express from 'express';
import TodoListCtrl from './todolist.controller.js';

const app = express();

app.get('/', TodoListCtrl.apiGetTodoList);
app.get('/id/:id', TodoListCtrl.apiGetTodoListById);
app.get('/id/:id/img', TodoListCtrl.apiGetImages);

app.post('/todo', TodoListCtrl.apiPostTodoList)
app.put('/todo', TodoListCtrl.apiUpdateTodoList);
app.delete('/todo',TodoListCtrl.apiDeleteTodoList);

export default app;