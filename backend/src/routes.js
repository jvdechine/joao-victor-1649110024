const responseMiddleware = require('./middlewares/responseMiddleware');
const requestMiddleware = require('./middlewares/requestMiddleware');

const toDoRoutes = require('./routes/toDoRoutes')();
const userRoutes = require('./routes/userRoutes')();
const toDoItemsRoutes = require('./routes/toDoItemsRoutes')();

function routes(app) {
    this.app = app;

    this.app.use('*', requestMiddleware);

    this.app.use('/toDo', toDoRoutes)
    this.app.use('/user', userRoutes)
    this.app.use('/toDoItems', toDoItemsRoutes)

    this.app.use('*', responseMiddleware);
}

module.exports = routes;