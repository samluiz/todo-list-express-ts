/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express"
import Task from "../models/task"
import { getTask } from "../middlewares/get_task"
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
})

router.get("/:id", getTask, async (req, res: any) => {
  res.json(res.task)
})

router.delete("/:id", getTask, async (req, res: any) => {
  try {
    await res.task.remove()
    res.status(204).send()
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
})

router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  })
  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
})

router.patch("/:id", getTask, async (req, res: any) => {
  if (req.body.title != null) {
    res.task.title = req.body.title
  }
  if (req.body.description != null) {
    res.task.description = req.body.description
  }
  try {
    const updatedTask = await res.task.save()
    res.json(updatedTask)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
})

export default router
