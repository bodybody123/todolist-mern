import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let todo;

/**
 * * This file handles the Request from Server to the Database
 */

export default class TodolistDao {
    static async injectDB (conn) {
        if (todo) {
            return;
        }
        try {
            todo = await conn.db(process.env.RESTREVIEWS_NS).collection('todo');
        } catch (e) {
            console.error(`Unable to establish a collection handle in todolistDAO: ${e}`);
        }
    }
    
    /**
     *  * handle Read from the database
     */
    static async getTodo() {
        let cursor;

        try {
            cursor = await todo.find();
        } catch (e) {
            console.error(`Unable to issue command, ${e}`);
            return;
        }

        const displayCursor = cursor; 

        try{
            return displayCursor.toArray();
        }
        catch(e) {
            console.error(
                `Unable to convert cursor to array, ${e}`
            );
        }
    }

    static async getTodoById(id){
        let cursor;

        try {
            cursor = await todo.find({ _id: new ObjectId(id)});
        } catch(e) {
            console.error(`Unable to issue command ${e}`);
            return;
        }

        const displayCursor = cursor;

        try{
            return displayCursor.toArray();
        }catch(e) {
            console.error(`Unable to convert cursor to array, ${e}`);
        }
    }

    /**
     * * Handle Create
     */
    static async addTodo(text, file, date){
        try {
            const todoDoc = {
                text: text,
                file: file,
                date: date
            };

            return await todo.insertOne(todoDoc);
        } catch (e) {
            console.error(`Unable to create what todo: ${e}`);
            return { error: e };
        }
    }
    /**
     * * Handle Update
     */
    static async updateTodo(todoId, text, file, date) {
        try {
            const updateResponse = await todo.updateOne(
                { _id: ObjectId(todoId) },
                { $set: { text: text, file: file, date: date } }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update what todo: ${e}`);
            return { error: e }
        }
    }

    static async deleteTodo(todoId){
        try{
            const deleteResponse = await todo.deleteOne({
                _id: ObjectId(todoId),
            })

            return deleteResponse;
        }catch (e) {
            console.error(`Unable to delete what todo: ${e}`);
            return { error: e }
        }
    }
}