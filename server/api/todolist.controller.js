import TodoListDAO from '../dao/todolistDAO.js';
import multer from 'multer';

/**
 * * This Files controlls the Request from the client to the server
 * 
 * ! ERROR tracker
 * ! Unable to update
 */

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let ext;
        switch (file.mimetype) {
            case 'image/png':
                ext = '.png';
                break;
            case 'image/jpeg':
                ext = '.jpg';
                break;
            default:
                break;
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })
  
  const upload = multer({ storage: storage }).single('file');
export default class TodoListController {

    /**
     * * Control Request for Read for all
     */
    static async apiGetTodoList(req, res) {
        let response = {};

        const todoList = await TodoListDAO.getTodo();

        response = todoList;

        res.json(response);
    }

    static async apiGetTodoListById(req, res) {
        try{
            let id = req.params.id || {};
            let todoList = await TodoListDAO.getTodoById(id);
            if(!todoList){
                res.status(404).json({ error: 'ctrl not found' });
                return;
            }
            res.json(todoList);
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
      }  
    }
    /**
     * * Control Create request
     */
    static async apiPostTodoList(req, res, next) {  
        try {
            upload(req, res, err => {
                const text = req.body.text;
                const file = req.file ? req.file.filename : '';
                const date = new Date();

                const todoResponses = TodoListDAO.addTodo(
                    text,
                    file,
                    date
                );
                res.json({ message: 'success' });
            })
            } catch(e) {
                console.error(e);
                res.status(500).json({ error: e.message });
            }
    }

    /**
     * * Control Update request
     */
    static async apiUpdateTodoList(req, res) {
        try {
            upload(req, res, next => {
                const todoId = req.body.id;
                const text = req.body.text;
                const file = req.file ? req.file.filename : '';
                const date = new Date();
    
                const todoResponse = TodoListDAO.updateTodo(
                    todoId,
                    text,
                    file,
                    date
                );
                
                console.log(`${req}`);
                const { error } = todoResponse;
                if(error){
                    res.status(400).json({ error });
                }
    
                if (todoResponse.modifiedCount === 0) {
                    throw new Error(
                      "unable to update todo - user may not be original poster",
                    )
                }
    
                res.json({ status: 'success' });

            })
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteTodoList(req, res) {
        try{
            const todoId = req.query.id;
            console.log(todoId);

            const deleteResponse = await TodoListDAO.deleteTodo(
                todoId,
            )
            res.json({ status: 'success' });
        }
        catch(e){
            res.status(500).json({ error: e.message });
        }
    }
}