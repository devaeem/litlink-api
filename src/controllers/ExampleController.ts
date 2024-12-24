import { Request, Response } from "express";
import { ControllerBase } from "./ControllerBase";
import { HttpStatusCode } from "../้http/status/code";
import { HttpStatusMessage } from "../้http/status/code";
import { ExampleService } from "../services/ExampleService";
import { parsePaginationQuery } from "../dtos/pagination.dto";
import { ZodError } from "zod";
import { parseExamplePayload } from "../dtos/example.dto";

export class ExampleController extends ControllerBase {
  private exampleService: ExampleService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.exampleService = new ExampleService();
  }

  public async getExample() {
    try {
      const { page, limit } = parsePaginationQuery(this.req.query);

      const data = await this.exampleService.getAll({ page, limit });
      return await this.sendSuccess(
        data,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return await this.sendError(
          error.errors[0].message,
          HttpStatusCode.BAD_REQUEST
        );
      }

      return await this.sendError(
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createExample() {
    try {
      const payload = parseExamplePayload(this.req.body);
      const result = await this.exampleService.create(payload);
      return await this.sendSuccess(
      null,
        HttpStatusMessage.CREATED,
        HttpStatusCode.CREATED
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return await this.sendError(
          error.errors[0].message,
          HttpStatusCode.BAD_REQUEST
        );
      }

      return await this.sendError(
        HttpStatusMessage.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}
