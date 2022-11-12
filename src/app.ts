import express from "express";
import usersRoute from './routes/usersRoute';

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello express\n");
});

app.use('/users', usersRoute);

export default app;