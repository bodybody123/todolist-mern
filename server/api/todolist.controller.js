import TodoListDAO from '../dao/todolistDAO.js';

/**
 * * This Files controlls the Request from the client to the server
 * 
 * ! ERROR tracker
 * 
 */

export default class TodoListController {
    static async test(req, res) {
        res.json({ message: 'success'})
    }

    /**
     * * Controll Request for Read for all
     */
    static async apiGetTodoList(req, res) {
        let response = {};

        const todoList = await TodoListDAO.getTodo();

        response = todoList;

        res.json(response);
    }

    static async apiPostTodoList(req, res) {
        try {
            const title = req.body.title;
            const text = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }
            const date = new Date();

            const todoResponses = await TodoListDAO.addTodo(
                title,
                text,
                date,
                userInfo
            );
            res.json({ status: 'success' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }
}