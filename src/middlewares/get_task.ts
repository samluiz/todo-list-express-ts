/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction } from "express"
import Task from "../models/task"
import { Document } from "mongoose"

export async function getTask(req: any, res: any, next: NextFunction) {
  let task: Document<any, any, any> | null
  try {
    task = await Task.findById(req.params.id)
    if (task == null) {
      return res.status(404).json({ message: "User not found." })
    }
  } catch (e: any) {
    return res.status(500).json({ message: e.message })
  }
  res.task = task
  next()
}
