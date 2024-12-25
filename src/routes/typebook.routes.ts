import { Router } from "express";
import { TypeBookController } from "../core/typebook/typebook.controller.min";
import { createHandler } from "../utils/routeHandler";
import { HttpMethod } from "../http/status/method";

const router = Router();
const ctx = TypeBookController;

interface RouteProps {
  path: string;
  method: HttpMethod.GET | HttpMethod.POST | HttpMethod.PUT | HttpMethod.DELETE;
  controller: typeof ctx;
  handler: string;
}

const baseRoutes: RouteProps[] = [
  {
    path: "/typebook",
    method: HttpMethod.GET,
    controller: ctx,
    handler: "getTypebook",
  },
  {
    path: "/typebook",
    method: HttpMethod.POST,
    controller: ctx,
    handler: "createTypebook",
  },
  {
    path: "/typebook/:id",
    method: HttpMethod.PUT,
    controller: ctx,
    handler: "updateTypebook",
  },
  {
    path: "/typebook/:id",
    method: HttpMethod.DELETE,
    controller: ctx,
    handler: "deleteTypebook",
  },
];

baseRoutes.forEach((route: RouteProps): void => {
  router[route.method](route.path, createHandler(route.controller, route.handler));
});

export default router;
