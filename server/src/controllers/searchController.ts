import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    // search for TASKS
    const tasks = await prisma.task.findMany({
        where:{
            OR: [
                {title: {contains: query as string}},
                {description: {contains: query as string}}
            ]
        }
    });
    // search for PROJECTS
    const projects = await prisma.project.findMany({
        where:{
            OR: [
                {name: {contains: query as string}},
                {description: {contains: query as string}}
            ]
        }
    });
    // search for USER
    const users = await prisma.user.findMany({
        where:{
            OR: [
                {username: {contains: query as string}},
            ]
        }
    });
    res.json({tasks, projects, users});
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error performing search: ${error.message}` });
  }
};
