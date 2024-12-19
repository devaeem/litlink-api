import { Request, Response } from 'express';
import { ResponseHelper } from '../helpers/ResponseHelper';
import { HttpStatusCode, HttpStatusMessage } from '../้http/status/code';
import { PaginationDto, parsePaginationQuery } from '../dtos/pagination.dto';

export abstract class ControllerBase {
    protected req: Request;
    protected res: Response;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
    }

    protected sendSuccess<T>(data: T, message: HttpStatusMessage, statusCode: HttpStatusCode ) {
        return this.res.status(statusCode).json(
            ResponseHelper.success(data, message, statusCode)
        );
    }

    protected sendError(message: HttpStatusMessage, statusCode: HttpStatusCode) {
        return this.res.status(statusCode).json(
            ResponseHelper.error(message, statusCode)
        );
    }

    protected getPaginationParams(req: Request): PaginationDto {
        return parsePaginationQuery(req.query);
    }

    protected getPaginationResponse<T>(
        data: T[],
        total: number,
        pagination: PaginationDto
    ) {
        return {
            data,
            meta: {
                total,
                page: pagination.page,
                limit: pagination.limit,
                totalPages: Math.ceil(total / pagination.limit),
            },
        };
    }
}