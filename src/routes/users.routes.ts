import { Router } from "express";
import { createHandler } from "../utils/routeHandler";
import { HttpMethod } from "../http/status/method";
import { UserController  } from "../core/user/UserController.min";
const router = Router();
const ctx = UserController;

interface RouteProps {
  path: string;
  method: HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE;
  controller: typeof ctx;
  handler: string;
}

const baseRoutes: RouteProps[] = [
  {
    path: "/user",
    method: HttpMethod.GET,
    controller: ctx,
    handler: "getUser",
  },
  {
    path: "/user/:id",
    method: HttpMethod.GET,
    controller: ctx,
    handler: "getUserById",
  },
  // {
  //   path: "/user",
  //   method: HttpMethod.POST,
  //   controller: ctx,
  //   handler: "createUser",
  // },
  {
    path: "/user/:id",
    method: HttpMethod.PUT,
    controller: ctx,
    handler: "updateUser",
  },
  {
    path: "/user/:id",
    method: HttpMethod.DELETE,
    controller: ctx,
    handler: "deleteUser",
  },
];

baseRoutes.forEach((route: RouteProps):void => {
  const { path, method, controller, handler } = route;

  // Ensure method is a valid Router method
  if (typeof router[method] === "function") {
    (router[method] as Function)(path, createHandler(controller, handler));
  }
});

export default router;
