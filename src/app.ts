import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { xenv } from "./config/setting";
import exampleRoutes from "./routes/example.routes";
import bookRoutes from "./routes/Book.routes";
import { MongoDBConnection } from "./config/mongodb.config";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';

class App {
    public app: Express;
    private port: number | string;

    constructor() {
        this.app = express();
        this.port = xenv.PORT;
        this.initializeSwagger();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeDatabase();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(morgan("dev"));
    }

    private initializeSwagger(): void {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    private initializeRoutes(): void {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Express + TypeScript Server is running");
        });
        this.app.use("/api", exampleRoutes);
        this.app.use("/api", bookRoutes);
    }

    private async initializeDatabase(): Promise<void> {
        const mongoConnection = MongoDBConnection.getInstance();
        await mongoConnection.connect();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);
        });
    }
}

const server = new App();
server.listen();

export default server.app;
