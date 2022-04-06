function requestMiddleware() {
    
    function middleware(req, res, next) {
        req.timeOfRequest = process.hrtime();
        next()
    }

    return {
        middleware
    }
}

module.exports = requestMiddleware().middleware;