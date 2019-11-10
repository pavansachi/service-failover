import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import Messages from "./api/v1/controllers/Messages";

require('dotenv').config()

const app:Application = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.send('OK')
})

app.use('/api/v1/', Messages);

app.listen(3000, () => console.log(`server running at port ${PORT}`))