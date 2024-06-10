import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statuscode).json({
      success: false,
      statusCode: err.statuscode || "404",
      message: err.message,
      errDetails: err.stack,
    });
  } else if (err instanceof Error) {
    res.status(err.statuscode || 404).json({
      success: false,
      statusCode: err?.statuscode || "404",
      message: err?.message || "Internal Server Error!",
      errDetails: err?.stack || "",
    });
  }
};
