const express = require('express');
const mongoose = require('mongoose');

function start() {
    this.app = express();
    mongoose.connect(
        process.env.CONNECTIONSTRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    mongoose.set('useCreateIndex', true);
    
    this.app.use(express.urlencoded({
        extended: true,
        limit: '50mb'            
    }));
    this.app.use(express.text({ 
        limit: '50mb'             
    }));
    this.app.use(express.json({
        type: "application/json",
        limit: '50mb', 
        extended: true
    }));
    this.app.use(express.json({
        type: "application/json-patch+json",
        limit: '50mb', 
        extended: true
    }));
    this.app.use(express.json({
        type: "text/json",
        limit: '50mb', 
        extended: true
    }));

    this.app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    require('./routes')(this.app);
    
    this.app.use((req, res, next) => {
        res.sendStatus(404)
    });

    return app;
}

module.exports = start;