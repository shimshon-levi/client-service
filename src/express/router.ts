<<<<<<< HEAD
import { Router } from "express";
import { clientsRouter } from "./clients/router";
import { casesRouter } from "./cases/router";

export const appRouter = Router();

// appRouter.get("/health", (_, res) => res.json({ status: "ok" }));

appRouter.use("/clients", clientsRouter);
appRouter.use("/cases", casesRouter);

appRouter.get(["/isAlive", "/isalive", "/health"], (req, res) => {
  res.status(200).json({ status: "ok" });
});
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
