import { ControllerBase } from "../../controllers/ControllerBase";
import { Request, Response } from "express";
import { HttpStatusMessage, HttpStatusCode } from "../../้http/status/code";
import { ZodError } from "zod";
import { BookService } from "./BookService";
import { parsePaginationQuery } from "../../dtos/pagination.dto";
import { parseBookGetIdPayload } from "./dtos/bookGetId.dto";
import {
  parseBookCreatePayload,
  parseBookUpdatePayload,
} from "./dtos/bookReq.dto";
import { GetAllResponseDto, PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";

export class BookController extends ControllerBase {
  private _bookService: BookService;
  constructor(req: Request, res: Response) {
    super(req, res);
    this._bookService = new BookService();
  }

  async getBook(): Promise<void> {
    try {
      const dto = parsePaginationQuery(this.req.query);

      const books = await this._bookService.getAll({...dto, populate: dto.populate ? dto.populate.split(",") : undefined});
      this.sendSuccess(
        books,
        HttpStatusMessage.SUCCESS,
        HttpStatusCode.SUCCESS
      );
    } catch (error: unknown) {
      console.log(error);
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

  async getBookById(): Promise<void> {
    try {
      const dto = parseBookGetIdPayload(this.req.params);

      const book = await this._bookService.getById(dto.id);
      if (!book) {
        this.sendError("BookId not found", HttpStatusCode.NOT_FOUND);
        return;
      }
      this.sendSuccess(book, HttpStatusMessage.SUCCESS, HttpStatusCode.SUCCESS);
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

  async createBook(): Promise<void> {
    try {
      const dto = parseBookCreatePayload(this.req.body);
      const book = await this._bookService.create(dto);
      this.sendSuccess(book, HttpStatusMessage.CREATED, HttpStatusCode.CREATED);
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

  async updateBook(): Promise<void> {
    try {
      const dto = parseBookUpdatePayload(this.req.body);
      const findId = await this._bookService.getById(this.req.params.id);
      if (!findId) {
        this.sendError("BookId not found", HttpStatusCode.NOT_FOUND);
        return;
      }
      const book = await this._bookService.update(dto, this.req.params.id);

      this.sendSuccess(null, HttpStatusMessage.SUCCESS, HttpStatusCode.SUCCESS);
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

  async deleteBook(): Promise<void> {
    try {
      const dto = await parseBookGetIdPayload(this.req.params);
      const findId = await this._bookService.getById(dto.id);
      if (!findId) {
        this.sendError("BookId not found", HttpStatusCode.NOT_FOUND);
        return;
      }
      const book = await this._bookService.delete(dto.id);
      this.sendSuccess(
        book,
        HttpStatusMessage.DELETED,
        HttpStatusCode.NO_CONTENT
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
}
