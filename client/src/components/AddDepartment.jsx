import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, Loading, ModalWrapper, Textbox } from ".";
import {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} from "../redux/slices/api/departmentApiSlice";

const AddDepartment = ({ open, setOpen, departmentData }) => {
  let defaultValues = departmentData ?? {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNewDepartment, { isLoading }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();

  const handleOnSubmit = async (data) => {
    try {
      if (departmentData) {
        const res = await updateDepartment({
          ...data,
          id: departmentData._id,
        }).unwrap();
        toast.success(res?.message);
      } else {
        const res = await addNewDepartment(data).unwrap();
        toast.success("New department added successfully");
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="mb-4 text-base font-bold leading-6 text-gray-900"
          >
            {departmentData ? "UPDATE DEPARTMENT" : "ADD NEW DEPARTMENT"}
          </Dialog.Title>
          <div className="flex flex-col gap-6 mt-2">
            <Textbox
              placeholder="Department name"
              type="text"
              name="name"
              label="Department Name"
              className="w-full rounded"
              register={register("name", {
                required: "Department name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Description"
              type="text"
              name="description"
              label="Description"
              className="w-full rounded"
              register={register("description")}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="px-8 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="px-5 text-sm font-semibold text-gray-900 bg-white sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddDepartment;
