import express from 'express';
import TodoListCtrl from './todolist.controller.js';

const router = express.Router();

router.route('/').get(TodoListCtrl.apiGetTodoList);
router.route("/id/:id").get(TodoListCtrl.apiGetTodoListById);

router
    .route('/todo')
    .post(TodoListCtrl.apiPostTodoList)
    .put(TodoListCtrl.apiUpdateTodoList)
    .delete(TodoListCtrl.apiDeleteTodoList);

export default router;