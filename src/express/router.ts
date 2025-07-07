import { Router } from "express";
import { clientsRouter } from "./clients/router";
import { casesRouter } from "./cases/router";
import { templatesRouter } from "./templates/router";

export const appRouter = Router();

// appRouter.get("/health", (_, res) => res.json({ status: "ok" }));

appRouter.use("/clients", clientsRouter);
appRouter.use("/cases", casesRouter);
appRouter.use("/templates", templatesRouter);

appRouter.get(["/isAlive", "/isalive", "/health"], (req, res) => {
  res.status(200).json({ status: "ok" });
});
// init
