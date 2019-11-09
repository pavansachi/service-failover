import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import messages from "./routes/messages";

require('dotenv').config()

const app:Application = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.send('OK')
})

app.use('/api/v1/', messages);

app.listen(3000, () => console.log(`server running at port ${PORT}`))