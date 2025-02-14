import asyncHandler from "express-async-handler";
import Department from "../models/department.js";

// POST - Register a new user
const createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    return res
      .status(400)
      .json({ status: false, message: "Department already exists" });
  }

  const user = await Department.create({
    name,
    description,
  });

  res.status(201).json({ message: "Department created successfully" });
});

const getDepartmentList = asyncHandler(async (req, res) => {
  const departments = await Department.find();

  res.status(201).json(departments);
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  await Department.findByIdAndUpdate(id, { name, description }, { new: true });

  res.status(201).json({
    status: true,
    message: " Updated Successfully.",
  });
});

// DELETE - delete user account
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Department.findByIdAndDelete(id);

  res
    .status(200)
    .json({ status: true, message: "Department deleted successfully" });
});

export {
  createDepartment,
  deleteDepartment,
  getDepartmentList,
  updateDepartment,
};
