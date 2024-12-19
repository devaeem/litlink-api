import { Router } from 'express';
import { ExampleController } from '../controllers/ExampleController';
import { Request, Response } from 'express';

const router = Router();

router.get('/example', async (req: Request, res: Response) => {
    const controller = new ExampleController(req, res);
    await controller.getExample();
});

router.post('/example', async (req: Request, res: Response) => {
    const controller = new ExampleController(req, res);
    await controller.createExample();
});

router.put('/example/:id', async (req: Request, res: Response) => {
    const controller = new ExampleController(req, res);
    await controller.updateExample();
});

router.delete('/example/:id', async (req: Request, res: Response) => {
    const controller = new ExampleController(req, res);
    await controller.deleteExample();
});

export default router;