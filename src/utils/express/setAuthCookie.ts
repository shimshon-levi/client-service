<<<<<<< HEAD
import { Response } from "express";
import { config } from "../../config/config";

const {
  cookie: { name: cookieName, httpOnly, secure, sameSite, maxAge },
} = config;

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie(cookieName, token, {
    httpOnly,
    secure,
    sameSite,
    maxAge,
  });
};
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
