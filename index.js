import express from 'express';
import cors from 'cors';
import mysql2 from 'mysql2';

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running at 3001`)
})

app.get("/", (req, res) => {
    res.send("WOW!! Server is up and running")
})

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password:"araj",
    database:"user"
})

app.get("/users", (req, res) => {
    const q = "SELECT * FROM user.users";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post('/add_user', async(req, res) => {
    // console.log(req.body);
    const q = "INSERT INTO users (`email`,`password`,`type`,`active`) VALUES (?)"
    const { email, password, type, active } = req.body;
    console.log(email,password)
    const values = [
        email,
        password,
        type,
        active
    ]
    db.query(q, [values], (err, data) => {
        if (err) res.send(err);
        return res.json("Data inserted successfully")
    })
})
// update user method
app.put("/user_update/:id", (req, res) => {
    const { id } = req.params;
    const { email, password, type, active } = req.body;
    const q = "UPDATE users SET `email` = ?,`password` = ?,`type` = ?,`active` = ? WHERE id = ?";
    const values=[email,password,type,active]
    db.query(q, [...values, id], (err, data) => {
        if (err) res.send(err);
        res.send(data);
    })
})

// delete a user
app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM users WHERE id = ?"
    
    db.query(q, [id], (err, data) => {
        if (err) res.send(err);
        res.json(`DELETED THE USER WITH ID ${id}`)
    })
})