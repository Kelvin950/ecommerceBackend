
import rateLimit from 'express-rate-limit';

export const emailLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many email requests from this IP, please try again later",
});
