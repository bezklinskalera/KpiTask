import express from 'express';

const app = express();

app.get("/", (req,res) => {
    res.send("Server is ready");
})

app.listen(8086, () => {
    console.log("Server started");
});