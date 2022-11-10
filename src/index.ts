import app from "./app";

const PORT = process.env.PORT || 3000;

console.log("index")
app.listen(PORT, () => {
    console.log(`REST API server ready at: http://localhost:${PORT}`);
});