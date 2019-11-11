import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import Messages from "./api/v1/controllers/Messages";
import dotenv from "dotenv";
import Logger from "./api/v1/utils/Logger";
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/v1/swagger.json');

// initialize environment vars
dotenv.config();

const app: Application = express();
module.exports = app;

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const log = Logger();

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/v1/status", (req: Request, res: Response, next: NextFunction) => {

    log.info("healthy");
    res.send("OK");
});

app.use("/api/v1/", Messages);

app.listen(PORT, () => log.info(`server running at port ${PORT}`));
