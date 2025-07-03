<<<<<<< HEAD
import winston from "winston";

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}] ${message}`
    )
  ),
});
=======
// init
>>>>>>> 83bd08017e0243b231e41ae12dc9dba2f577cbbd
