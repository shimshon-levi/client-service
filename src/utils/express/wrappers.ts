import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { TypedRequest } from "../zod";
import { config } from "../../config/config";
import { createProxyMiddleware } from "http-proxy-middleware";

// 🧠 גרסה גמישה של wrapController שתומכת גם ב־AuthenticatedRequest
export const wrapController = (
  func: (req: any, res: Response, next?: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export const wrapMiddleware = (
  func: (req: Request, res?: Response) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res).then(next).catch(next);
  };
};

export const validateRequest = (schema: AnyZodObject) => {
  return wrapMiddleware(async (req: Request) => {
    const parsed = await schema.parseAsync({
      body: req.body ?? {}, // ← דיפולטים בטוחים
      query: req.query ?? {},
      params: req.params ?? {},
    });

    // body: אם חסר, צור אובייקט ריק ואז מזג
    if (parsed.body) {
      if (req.body == null || typeof req.body !== "object") {
        (req as any).body = {};
      }
      Object.assign(req.body as any, parsed.body);
    }

    // query/params: אל תחליף, רק מזג פנימה (לא עושים req.query = ...)
    if (parsed.query) Object.assign(req.query as any, parsed.query);
    if (parsed.params) Object.assign(req.params as any, parsed.params);
  });
};

export const wrapProxy = (
  uri: string
  // Timeout: number = config.service.requestTimeout
) => {
  return createProxyMiddleware({
    target: uri,
    // proxyTimeout: Timeout,
  });
};
// init
