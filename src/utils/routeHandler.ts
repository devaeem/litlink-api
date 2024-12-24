import { Request, Response } from 'express';

// Add controller method interface
interface IControllerMethod {
  (): Promise<void>;
}

interface IController {
  [key: string]: IControllerMethod;
}

export const createHandler = <T>(
    ControllerClass: new (req: Request, res: Response) => T,
    methodName: string
) => {
    return async (req: Request, res: Response) => {
        const controller  = new ControllerClass(req, res);
        const method = controller[methodName as keyof T] as IControllerMethod;

        if (typeof method !== 'function') {
            // throw new Error(`Method ${methodName} not found in controller`);
            res.status(404).json({ message: `Method ${methodName} not found in controller` });
        }

        await method.call(controller);
    };
};