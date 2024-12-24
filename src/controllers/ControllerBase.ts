import { Request, Response } from "express";
import { ResponseHelper } from "../helpers/ResponseHelper";
import { HttpStatusCode, HttpStatusMessage } from "../้http/status/code";
import { PaginationDto, parsePaginationQuery } from "../dtos/pagination.dto";

export abstract class ControllerBase {
  protected req: Request;
  protected res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  protected async sendSuccess<T>(
    data: T,
    message: HttpStatusMessage,
    statusCode: HttpStatusCode
  ) {
    return await this.res
      .status(statusCode)
      .json(ResponseHelper.success(data, message, statusCode));
  }

  protected async sendError(message: any, statusCode: HttpStatusCode) {
    return await this.res
      .status(statusCode)
      .json(ResponseHelper.error(message, statusCode));
  }
}
