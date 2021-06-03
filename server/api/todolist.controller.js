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
     * * Control Request for Read for all
     */
    static async apiGetTodoList(req, res) {
        let response = {};

        const todoList = await TodoListDAO.getTodo();

        response = todoList;

        res.json(response);
    }

    /**
     * * Control Create request
     */
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

    /**
     * * Control Update request
     */
    static async apiUpdateTodoList(req, res) {
        try {
            const todoId = req.body.todo_id;
            const title = req.body.title;
            const text = req.body.text;
            const date = new Date();

            const reviewResponse = await TodoListDAO.updateTodo(
                todoId,
                title, 
                text, 
                date,
                req.body.user_id
            );

            var { error } = reviewResponse;
            if(error){
                res.status(400).json({ error });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                  "unable to update review - user may not be original poster",
                )
            }

            res.json({ status: 'success' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteTodoList(req, res) {
        try{
            const todoId = req.query.id;
            const userId = req.body.user_id;
            console.log(todoId);

            const deleteResponse = await TodoListDAO.deleteTodo(
                todoId,
                userId
            )
            res.json({ status: 'success' });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}