export default interface Response<T>{
    message: string;
    processingTime: string;
    result: T;
    statusCode: number;
}