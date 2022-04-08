const responseMiddleware = require('./middlewares/responseMiddleware');
const requestMiddleware = require('./middlewares/requestMiddleware');

const toDoRoutes = require('./routes/toDoRoutes')();
const userRoutes = require('./routes/userRoutes')();
const toDoItemsRoutes = require('./routes/toDoItemsRoutes')();
const authRoutes = require('./routes/authRoutes')();

function routes(app) {
    this.app = app;

    this.app.use('*', requestMiddleware);

    this.app.use('/api/v1/auth', authRoutes)
    this.app.use('/api/v1/toDo', toDoRoutes)
    this.app.use('/api/v1/user', userRoutes)
    this.app.use('/api/v1/toDoItems', toDoItemsRoutes)

    this.app.use('*', responseMiddleware);
}

module.exports = routes;