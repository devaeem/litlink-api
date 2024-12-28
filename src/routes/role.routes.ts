import { Router } from "express";
import { createHandler } from "../utils/routeHandler";
import { HttpMethod } from "../http/status/method";
import { RoleController } from "../core/role/RoleController.min";
const router = Router();
const ctx = RoleController;

interface RouteProps {
  path: string;
  method: HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE;
  controller: typeof ctx;
  handler: string;
}

const baseRoutes: RouteProps[] = [
  {
    path: "/role",
    method: HttpMethod.GET,
    controller: ctx,
    handler: "getRole",
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
