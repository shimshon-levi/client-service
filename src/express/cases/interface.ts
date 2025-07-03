<<<<<<< HEAD
import { Request } from "express";
import { z } from "zod";
export interface ICase {
  clientId: string;
  title: string;
  status?:
    | "open"
    | "in_progress"
    | "waiting_documents"
    | "completed"
    | "closed";
  documents?: string[];
  notes?: string;
  createdAt?: Date;
}
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
