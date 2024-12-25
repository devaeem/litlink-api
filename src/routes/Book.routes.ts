import { BookController } from "../core/book/BookController.min";
import { Router } from "express";
import { createHandler } from "../utils/routeHandler";
import { HttpMethod } from "../http/status/method";

const router = Router();
const ctx = BookController;

interface RouteProps {
  path: string;
  method: HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE;
  controller: typeof ctx;
  handler: string;
}

const baseRoutes: RouteProps[] = [
 {
   path: "/book",
   method: HttpMethod.GET,
   controller: ctx,
   handler: "getBook",
 },
 {
   path: "/book/:id",
   method: HttpMethod.GET,
   controller: ctx,
   handler: "getBookById",
 },
 {
   path: "/book",
   method: HttpMethod.POST,
   controller: ctx,
   handler: "createBook",
 },
 {
   path: "/book/:id",
   method: HttpMethod.PUT,
   controller: ctx,
   handler: "updateBook",
 },
 {
   path: "/book/:id",
   method: HttpMethod.DELETE,
   controller: ctx,
   handler: "deleteBook",
 },
];

// Map routes to Router
baseRoutes.forEach((route: RouteProps):void => {
 const { path, method, controller, handler } = route;

 // Ensure method is a valid Router method
 if (typeof router[method] === "function") {
   (router[method] as Function)(path, createHandler(controller, handler));
 } else {
   console.error(`Invalid method: ${method} for path: ${path}`);
 }
});

export default router;
