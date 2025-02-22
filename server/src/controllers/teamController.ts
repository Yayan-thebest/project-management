import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        // Trouver le username du product owner en fonction de userId
        const productOwner = team.productOwnerUserId
          ? await prisma.user.findUnique({
              where: { userId: team.productOwnerUserId },
              select: { username: true },
            })
          : null;

        const projectManager = team.productOwnerManagerId
          ? await prisma.user.findUnique({
              where: { userId: team.productOwnerManagerId },
              select: { username: true },
            })
          : null;

        return {
          ...team,
          productOwnerUsername: productOwner?.username || null,
          projectManagerUsername: projectManager?.username || null,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving teams: ${error.message}` });
  }
};
