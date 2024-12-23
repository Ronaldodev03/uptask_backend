import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

// si quiero usar req.project sin errores de TS tengo que hacer esto, ahora req tiene la property "project" type "IProject"
declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      const error = new Error("Proyecto no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.project = project; // se coloca el project en la request
    next();
    return;
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
    return;
  }
}
