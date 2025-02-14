import express from "express";

import {
  createDepartment,
  deleteDepartment,
  getDepartmentList,
  updateDepartment,
} from "../controllers/departmentController.js";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createDepartment);

router.get("/", protectRoute, getDepartmentList);

router.put("/:id", protectRoute, isAdminRoute, updateDepartment);

router.delete("/:id?", protectRoute, isAdminRoute, deleteDepartment);

export default router;
