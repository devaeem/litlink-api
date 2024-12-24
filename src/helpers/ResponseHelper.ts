
import { HttpStatusCode } from "../้http/status/code";

import { HttpStatusMessage } from "../้http/status/code";
import { formatMessageValue } from "../utils/typeChecks";
interface ApiResponse<T> {
    statusCode: HttpStatusCode;
    message: string;
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

    public static error(message: any, statusCode: HttpStatusCode): ApiResponse<null> {
        return {
            statusCode: statusCode,
            message: formatMessageValue(message)
        };
    }
}