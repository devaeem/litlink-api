import express, { Express, Request, Response } from 'express';
import { xenv } from './config/setting';
import exampleRoutes from './routes/example.routes';

const app: Express = express();
const port = xenv.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

app.use('/api', exampleRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
