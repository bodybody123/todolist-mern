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

    /**
     * * Handle Create
     */
    static async addTodo(title, text, date, user){
        try {
            const todoDoc = {
                title: title,
                text: text,
                date: date,
                user_id: user._id,
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
    static async updateTodo(todoId, title, text, date, userId) {
        try {
            const updateResponse = await todo.updateOne(
                { user_id: userId, _id: ObjectId(todoId) },
                { $set: { title: title, text: text, date: date } }
            );

            return updateResponse;
        } catch (e) {
            console.error(`Unable to update what todo: ${e}`);
            return { error: e }
        }
    }

    static async deleteTodo(todoId, userId){
        try{
            const deleteResponse = await todo.deleteOne({
                _id: ObjectId(todoId),
                user_id: userId,
            })

            return deleteResponse;
        }catch (e) {
            console.error(`Unable to delete what todo: ${e}`);
            return { error: e }
        }
    }
}