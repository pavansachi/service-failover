import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import Messages from "./api/v1/controllers/Messages";
import dotenv from "dotenv";
import Logger from "./api/v1/utils/Logger";

// initialize environment vars
dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const log = Logger();

app.get("/status", (req: Request, res: Response, next: NextFunction) => {

    log.info("healthy");
    res.send("OK");
});

app.use("/api/v1/", Messages);

app.listen(3000, () => log.info(`server running at port ${PORT}`));
