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




export default router;