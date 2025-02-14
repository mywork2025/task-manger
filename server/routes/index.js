import express from "express";

import departmentRoutes from "./department.js";
import taskRoutes from "./taskRoute.js";
import userRoutes from "./userRoute.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/department", departmentRoutes);

export default router;
