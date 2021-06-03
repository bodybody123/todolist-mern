import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import todolistDAO from './dao/todolistDAO.js';

dotenv.config()
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8008;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 50,
        writeConcern: {
            wtimeout: 2500,
        }
    }
    )
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        await todolistDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
        }
)
