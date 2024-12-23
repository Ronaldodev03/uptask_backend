import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body); // name y description vienen en el body
      task.project = req.project.id; // agrego el projectId a la task
      req.project.tasks.push(task.id); // agrego la task al project

      await Promise.allSettled([task.save(), req.project.save()]);

      res.send("Tarea creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      ); // con populate me traigo la info de los projects
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId).populate("project"); // con populate me traigo la info del project

      if (!task) {
        const error = new Error("Tarea no encontrada");
        res.status(404).json({ error: error.message });
        return;
      }

      // la task debe pertenecer al project
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Accion no válida");
        res.status(400).json({ error: error.message });
        return;
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
