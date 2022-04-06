const timeUtils = require('../utils/timeUtils')();

function responseMiddleware() {

    function middleware(req, res, next) {
        var processingTime = timeUtils.getDurationInMilliseconds(req.timeOfRequest);
        var _result = req._result;
        var _statusCode = req._statusCode;
        var _message = req._message;
        var _operation = req._operation;
        switch (_operation) {
            case "INSERT":
                res.status(201).json({
                    statusCode: 201,
                    message: "Registro(s) inserido(s) com sucesso!",
                    result: _result,
                    processingTime: processingTime
                });
                break;
            case "UPDATE":
                res.status(200).json({
                    statusCode: 200,
                    message: "Registro(s) atualizado(s) com sucesso!",
                    result: _result,
                    processingTime: processingTime
                });
                break;
            case "DELETE":
                if (!_result){
                    return res.status(204).send();
                } else{
                    res.status(200).json({
                        statusCode: 200,
                        message: "Registro(s) excluído(s) com sucesso!",
                        result: _result,
                        processingTime: processingTime
                    });
                }
                break;
            case "SELECT":
                if (!_result){
                    res.status(404).json({
                        statusCode: 404,
                        message: "Nenhum registro encontrado!",
                        result: _result,
                        processingTime: processingTime
                    });
                } else {
                    res.status(200).json({
                        statusCode: 200,
                        message: "Registro(s) retornado(s) com sucesso!",
                        result: _result,
                        processingTime: processingTime
                    });
                }
                break;
            case "ERROR":
                res.status(_statusCode).json({
                    statusCode: _statusCode,
                    message: _message,
                    result: _result,
                    processingTime: processingTime
                });
                break;
            default:
                res.status(400).json({
                    statusCode: 400,
                    message: "Selecione a operação desejada!",
                    result: _result,
                    processingTime: processingTime
                });
                break;
        }
    }

    return {
        middleware
    }
}

module.exports = responseMiddleware().middleware;