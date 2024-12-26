import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { xenv } from "./config/setting";
import bookRoutes from "./routes/Book.routes";
import { MongoDBConnection } from "./config/mongodb.config";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';
import typebookRoutes from "./routes/typebook.routes";
import authRoutes from "./routes/auth.routes";

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
        const v1Router = express.Router();
        //module
        //  library is module book management
        //  aaa is module user management



        v1Router.use("/library", bookRoutes);
        v1Router.use("/library", typebookRoutes);
        v1Router.use("/aaa", authRoutes);
        this.app.use("/api/v1", v1Router);
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
