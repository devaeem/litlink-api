import { Router } from "express";
import { AuthController } from "../core/auth/auth.controller.min";
import { createHandler } from "../utils/routeHandler";
import { HttpMethod } from "../http/status/method";

const router = Router();
const ctx = AuthController;


interface RouteProps {
 path: string;
 method: HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE;
 controller: typeof ctx;
 handler: string;
}

const baseRoutes: RouteProps[] = [
  {
    path: "/auth/login",
    method: HttpMethod.POST,
    controller: ctx,
    handler: "login"
  },
  {
    path: "/auth/register",
    method: HttpMethod.POST,
    controller: ctx,
    handler: "register"
  },
  {
    path: "/auth/logout",
    method: HttpMethod.POST,
    controller: ctx,
    handler: "logout"
  },
  {
    path: "/auth/refresh-token",
    method: HttpMethod.POST,
    controller: ctx,
    handler: "refreshToken"
  },




]

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

