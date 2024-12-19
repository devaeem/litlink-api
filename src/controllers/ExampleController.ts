import { Request, Response } from "express";
import { ControllerBase } from "./ControllerBase";
import { HttpStatusCode } from "../้http/status/code";
import { HttpStatusMessage } from "../้http/status/code";

export class ExampleController extends ControllerBase {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public async getExample() {
    try {
      // const data = { message: "This is an example response" };
      const data = [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "jane.doe@example.com",
        },
      ];
      return await this.sendSuccess(
        data,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
    } catch (error) {
      return await this.sendError(
        HttpStatusMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  public async createExample() {
    try {
      const data = this.req.body;
      return await this.sendSuccess(
        data,
        HttpStatusMessage.CREATED,
        HttpStatusCode.CREATED
      );
    } catch (error) {
      return await this.sendError(
        HttpStatusMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  public async updateExample() {
    try {
      const data = this.req.body;
      return await this.sendSuccess(
        data,
        HttpStatusMessage.NO_CONTENT,
        HttpStatusCode.NO_CONTENT
      );
    } catch (error) {
      return await this.sendError(
        HttpStatusMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  public async deleteExample() {
    try {
      return await this.sendSuccess(
        null,
        HttpStatusMessage.NO_CONTENT,
        HttpStatusCode.NO_CONTENT
      );
    } catch (error) {
      return await this.sendError(
        HttpStatusMessage.BAD_REQUEST,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }
}
