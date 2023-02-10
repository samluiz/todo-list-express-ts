/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import mongoose from "mongoose"
import taskController from "./controllers/task"
const app = express()
app.use(express.json())

app.use("/tasks", taskController)

mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1/todolist")
const db = mongoose.connection
db.on("error", (err: any) => console.log(err))
db.once("open", () => console.log("Connected"))

app.listen(3000, () => console.log("Server running on port 3000"))
