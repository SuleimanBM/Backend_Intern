// const express = require("express")
// const app = express()
// const port = 3000;
// //const hostname = "127.0.0.1"
// app.use(express.json())

// const tasks = []

// app.post("/tasks",(req,res) => {
//     const { name } = req.body

//     if(!name){
//         return res.status(400).json({message: "Task name is required"})
//     }

//     const newTask = {
//         id: tasks.length + 1,
//         name: name,
//         completed: false
//     }

//     tasks.push(newTask)
//     res.status(201).json({
//         message: "Task created successfully",
//         task: newTask
//     })
// })
// //Get all Tasks (GET)
// app.get("/tasks",(req,res) => {
//     res.status(200).json({tasks}) 
// })

// //Get a single task by ID (GET)
// app.get("/tasks/:id",(req,res) => {
//     const task = tasks.find(t => t.id === parseInt(req.params.id))
//     if(!task){
//         return res.status(404).json({message: "Task not found"})
//     }
//     res.status(200).json({task})
// })

// //Update a task (PUT)
// app.put("/tasks/:id",(req,res) => {
//     const task = tasks.find(t => t.id === parseInt(req.params.id))
//     if(!task){
//         return res.status(404).json({message: "Task not found"})
//     }
//     const {name,completed} = req.body
//     if(name) task.name = name;
//     if(completed) task.completed = completed;

//     res.status(200).json({task})
// })

// //Delete a task by ID (DELETE)
// app.delete("/tasks/:id",(req,res) => {
//     const taskIndex = tasks.find(t => t.id === parseInt(req.params.id))
//     if(!taskIndex){
//         return res.status(404).json({message: "Task not found"})
//     }
//     //const index = tasks.indexOf(taskIndex)
//     tasks.splice(taskIndex,1)
//     return res.status(204).json({message: "Task deleted successfully"})
// })

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`)
// })