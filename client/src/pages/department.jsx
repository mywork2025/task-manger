import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import { Button, ConfirmatioDialog, Loading, Title } from "../components";
import AddDepartment from "../components/AddDepartment";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentListsQuery,
} from "../redux/slices/api/departmentApiSlice";
import { getInitials } from "../utils/index";

const Department = () => {
  const { data, isLoading, refetch } = useGetDepartmentListsQuery();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteDepartment(selected);

      refetch();
      toast.success(res?.data?.message);
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (error) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    refetch();
  }, [open]);

  const TableHeader = () => (
    <thead className="border-b border-gray-300 dark:border-gray-600">
      <tr className="text-left text-black dark:text-white">
        <th className="py-2">Name</th>
        <th className="py-2">Description</th>
      </tr>
    </thead>
  );

  const TableRow = ({ depart }) => (
    <tr className="text-gray-600 border-b border-gray-200 hover:bg-gray-400/10">
      <td className="p-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center text-sm text-white bg-blue-700 rounded-full w-9 h-9">
            <span className="text-xs text-center md:text-sm">
              {getInitials(depart.name)}
            </span>
          </div>
          {depart.name}
        </div>
      </td>
      <td className="p-2">{depart?.description}</td>

      <td className="flex justify-end gap-4 p-2">
        <Button
          className="font-semibold text-blue-600 hover:text-blue-500 sm:px-0"
          label="Edit"
          type="button"
          onClick={() => editClick(depart)}
        />

        <Button
          className="font-semibold text-red-700 hover:text-red-500 sm:px-0"
          label="Delete"
          type="button"
          onClick={() => deleteClick(depart?._id)}
        />
      </td>
    </tr>
  );

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <>
      <div className="w-full px-0 mb-6 md:px-1">
        <div className="flex items-center justify-between mb-8">
          <Title title="  Departments" />

          <Button
            label="Add New"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="bg-white dark:bg-[#1f1f1f] px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.map((item, index) => (
                  <TableRow key={index} depart={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddDepartment
        open={open}
        setOpen={setOpen}
        departmentData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Department;
