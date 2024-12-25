import { ControllerBase } from "../../controllers/ControllerBase";
import { Request, Response } from "express";
import { HttpStatusMessage, HttpStatusCode } from "../../http/status/code";
import { ZodError } from "zod";

import { parsePaginationQuery } from "../../dtos/pagination.dto";
import { TypeBookService } from "./typebook.services";
import {
  parseTypebookCreatePayload,
  parseTypebookGetIdPayload,
  parseTypebookUpdatePayload,
} from "./dtos/typebook.validate";
import { parseBookCreatePayload, parseBookGetIdPayload } from "../book/dtos/bookReq.dto";

export class TypeBookController extends ControllerBase {
  private _typeBookService: TypeBookService;
  constructor(req: Request, res: Response) {
    super(req, res);
    this._typeBookService = new TypeBookService();
  }

  async getTypebook(): Promise<void> {
    try {
      const dto = parsePaginationQuery(this.req.query);

      const _dataResultTypebooks = await this._typeBookService.getAll({
        ...dto,
        populate: dto.populate ? dto.populate.split(",") : undefined,
      });
      this.sendSuccess(
        _dataResultTypebooks,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        this.sendError(error.errors[0].message, HttpStatusCode.BAD_REQUEST);
      } else {
        this.sendError(
          HttpStatusMessage.INTERNAL_SERVER_ERROR + error,
          HttpStatusCode.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async createTypebook(): Promise<void> {
    try {
      const dto = parseTypebookCreatePayload(this.req.body);

      const typebook = await this._typeBookService.create(dto);
      this.sendSuccess(typebook, HttpStatusMessage.CREATED, HttpStatusCode.CREATED);
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

  async updateTypebook(): Promise<void> {
    try {
      const dto = parseTypebookUpdatePayload(this.req.body);
      const findId = await this._typeBookService.getById({id: this.req.params.id});
      if (!findId) {
        this.sendError("TypebookId not found", HttpStatusCode.NOT_FOUND);
        return;
      }

      const typebook = await this._typeBookService.update(dto, {id: this.req.params.id});
      this.sendSuccess(
        null,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
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

  async getTypebookById(): Promise<void> {
    try {
      const dto = parseTypebookGetIdPayload(this.req.params);

      const typebook = await this._typeBookService.getById(dto);
      if (!typebook) {
        this.sendError("TypebookId not found", HttpStatusCode.NOT_FOUND);
        return;
      }
      this.sendSuccess(
        typebook,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
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

  // async deleteTypebook(): Promise<void> {
  //   try {
  //     const dto = await parseTypebookGetIdPayload(this.req.params);
  //     const findId = await this._typeBookService.getById(dto.id);
  //     if (!findId) {
  //       this.sendError("TypebookId not found", HttpStatusCode.NOT_FOUND);
  //       return;
  //     }
  //     const typebook = await this._typeBookService.delete(dto.id);
  //     this.sendSuccess(
  //       typebook,
  //       HttpStatusMessage.DELETED,
  //       HttpStatusCode.NO_CONTENT
  //     );
  //   } catch (error: unknown) {
  //     if (error instanceof ZodError) {
  //       this.sendError(error.errors[0].message, HttpStatusCode.BAD_REQUEST);
  //     } else {
  //       this.sendError(
  //         HttpStatusMessage.INTERNAL_SERVER_ERROR,
  //         HttpStatusCode.INTERNAL_SERVER_ERROR
  //       );
  //     }
  //   }
  // }
}
