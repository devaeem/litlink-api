import { HttpStatusCode } from "../้http/status/code";

import { HttpStatusMessage } from "../้http/status/code";

interface ApiResponse<T> {
    statusCode: HttpStatusCode;
    message: HttpStatusMessage;
    data?: T;
}

export class ResponseHelper {
    public static success<T>(data: T, message: HttpStatusMessage, statusCode: HttpStatusCode): ApiResponse<T> {
        return {
            statusCode: statusCode,
            message: message,
            data: data
        };
    }

    public static error(message: HttpStatusMessage, statusCode: HttpStatusCode): ApiResponse<null> {
        return {
            statusCode: statusCode,
            message: message
        };
    }
}