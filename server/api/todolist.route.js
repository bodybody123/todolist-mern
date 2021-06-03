import express from 'express';
import TodoListCtrl from './todolist.controller.js';

const router = express.Router();

router.route('/').get(TodoListCtrl.apiGetTodoList);

router
    .route('/todo')
    .post(TodoListCtrl.apiPostTodoList)
//     .put()
//     .delete();

export default router;