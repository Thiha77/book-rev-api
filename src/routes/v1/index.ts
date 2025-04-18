import { Router} from "express";
import bookRoutes from "./book";
import authorRoutes from "./author";
import reviewRoutes from "./review";

const router = Router();

router.use("/books", bookRoutes);
router.use("/authors", authorRoutes);
router.use("/reviews", reviewRoutes);

export default router;