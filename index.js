import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running at 3001`)
})

app.get("/", (req, res) => {
    res.send("WOW!! Server is up and running")
})