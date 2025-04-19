import app from "./app";
import config from "./config/config";
import { prisma } from "./utils/prisma";
import logger from "./utils/logger";

process.on("uncaughtException", async(err) => {
    logger.error("Uncaught Exception:", err);
    await cleanUp();
    process.exit(1);
  });
  
process.on("unhandledRejection", (reason) => {
    logger.error("Unhandled Rejection:", reason);
    process.exit(1);
});
  
process.on("SIGINT", async() => {
    await cleanUp();
    logger.info("Gracefully shutting down (SIGINT)...");
    process.exit(0);
});

process.on("SIGTERM", async() => {
    await cleanUp();
    logger.info("Gracefully shutting down (SIGTERM)...");
    process.exit(0);
});

const cleanUp = async () => {
    logger.info("Cleaning up resources...");
    try {
      await prisma.$disconnect();
      logger.info("Prisma disconnected successfully.");
    }
    catch (err) {
      logger.error("Error disconnecting Prisma:", err);
    }
}
const startServer = async () => {
    //logger.error("Uncaught Exception:", "Simulated error for testing uncaughtException handler");
    // throw new Error("Simulated error for testing uncaughtException handler");
    app.listen(config.PORT, () => {
        logger.info(`Server running on port ${config.PORT}`);
    });
  };

startServer();