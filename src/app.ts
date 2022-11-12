import express from "express";
import usersRoute from './routes/usersRoute';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello express\n");
});

app.use('/users', usersRoute);

app.use(notFound);
app.use(errorHandler);

export default app;