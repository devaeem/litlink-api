import { BookController } from "../core/book/BookController.min";
import { Router } from "express";
import { createHandler } from "../utils/routeHandler";

const router = Router();
const ctx = BookController;

interface RouteProps {
  path: string;
  method: "get" | "post" | "put" | "delete";
  controller: typeof ctx;
  handler: string;
}

const baseRoutes: RouteProps[] = [
 {
   path: "/book",
   method: "get",
   controller: ctx,
   handler: "getBook",
 },
 {
   path: "/book/:id",
   method: "get",
   controller: ctx,
   handler: "getBookById",
 },
 {
   path: "/book",
   method: "post",
   controller: ctx,
   handler: "createBook",
 },
 {
   path: "/book/:id",
   method: "put",
   controller: ctx,
   handler: "updateBook",
 },
 {
   path: "/book/:id",
   method: "delete",
   controller: ctx,
   handler: "deleteBook",
 },
];

// Map routes to Router
baseRoutes.forEach((route: RouteProps) => {
 const { path, method, controller, handler } = route;

 // Ensure method is a valid Router method
 if (typeof router[method] === "function") {
   (router[method] as Function)(path, createHandler(controller, handler));
 } else {
   console.error(`Invalid method: ${method} for path: ${path}`);
 }
});

export default router;
