const express=require("express")
const app=express()
const bodyParser = require('body-parser')
const port=5000

app.use(bodyParser.json())

let todos=[]

app.get("/api", (req, res) => {
    res.send(todos)
})

app.post('/api', (req, res) => {
    const newItem = req.body;
    todos.push(newItem);
    res.status(201).json({ message: 'Todo added successfully' });
})

app.delete('/api/:id', (req, res) => {
    const { id } = req.params;
    const newTodo=todos.filter(item => item.id!==parseInt(id))

    todos=newTodo
    res.sendStatus(204);
})

app.put('/api', (req, res) => {
    const newTodo=req.body
    todos=newTodo
    res.sendStatus(204);
})

app.listen(port, console.log(`Listening to ${port}`))