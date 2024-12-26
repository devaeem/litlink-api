import { ControllerBase } from "../../controllers/ControllerBase";
import { Request, Response } from "express";
import { HttpStatusMessage, HttpStatusCode } from "../../http/status/code";
import { ZodError } from "zod";

export class AuthController extends ControllerBase {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  async login(): Promise<void> {
    try {
      const dto = this.req.body;
      console.log(dto);
      this.sendSuccess(dto, HttpStatusMessage.SUCCESS, HttpStatusCode.SUCCESS);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        this.sendError(error.errors[0].message, HttpStatusCode.BAD_REQUEST);
      } else {
        this.sendError(
          HttpStatusMessage.INTERNAL_SERVER_ERROR,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
