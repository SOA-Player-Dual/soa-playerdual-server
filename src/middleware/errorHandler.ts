import { Request, Response, NextFunction } from "express";

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);
  if (error.name === "UnauthorizedError") {
    return res.status(401).json({ "error-message": error.message });
  }
  if (error.name === "ValidationError") {
    return res.status(401).json({ "error-message": error.message });
  }
  res.status(500).json({ "error-message": error.message });
};

export default errorHandler;