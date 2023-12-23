const express = require('express');
const cors = require('cors');

const { db } = require('../db/connection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = {
            auth: '/api/auth',
            persons: '/api/persons',
        };
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares() {
        this.app.use(cors());

        // parse data to receive on body request
        this.app.use(express.json());

        // config public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPath.auth, require('../routes/auth'));
        this.app.use(this.apiPath.persons, require('../routes/persons'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Running on ', this.port);
        });
    }
}

module.exports = Server;