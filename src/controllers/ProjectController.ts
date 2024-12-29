import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    // Asigna un manager
    project.manager = req.user.id;

    try {
      await project.save();
      res.send("Proyecto Creando Correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({
        //$or allows to write multiple conditions
        $or: [{ manager: { $in: req.user.id } }], //The query [{ manager: { $in: req.user.id } }] is asking MongoDB to return all Project documents where the manager field contains the id of the user making the request. Essentially, it retrieves projects where the current user is listed as a manager.
      });
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    // const { projectId } = req.params;
    try {
      // const project = await Project.findById(projectId).populate("tasks");
      const project = await Project.findById(req.project.id).populate("tasks");

      if (project.manager.toString() !== req.user.id.toString()) {
        const error = new Error("Acción no válida");
        res.status(404).json({ error: error.message });
        return;
      }
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    //  const { projectId } = req.params;
    try {
      // const project = await Project.findById(projectId);
      const project = await Project.findById(req.project.id);

      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;

      await project.save();
      res.send("Proyecto Actualizado");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    //const { projectId } = req.params;

    try {
      //   const project = await Project.findById(projectId);
      const project = await Project.findById(req.project.id);

      await project.deleteOne();

      res.send("Proyecto Eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
