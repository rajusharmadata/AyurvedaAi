import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ErrorResponse from "./utils/errorResponse.js";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { colorize } from "./config/colors.js";

// Import routes
import authRoutes from "./Routes/auth.js";
import chatRoutes from "./Routes/chat.js";
import practitionerRoutes from "./Routes/practitioner.js";

// Import middleware
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Create Express app
const app = express();

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set security HTTP headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount routers
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/practitioners", practitionerRoutes);

// Handle 404 - Route not found
app.all("*", (req, res, next) => {
  next(new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(colorize(`Error: ${err.message}`, "red"));
  errorHandler(err, req, res, next);
});

// Connect to MongoDB

connectDB();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    colorize(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      "green",
      "bold"
    )
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.error(colorize(`Error: ${err.message}`, "red"));
  console.error(colorize("Stack:", "red"), err.stack);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Connect to the database
connectDB();
