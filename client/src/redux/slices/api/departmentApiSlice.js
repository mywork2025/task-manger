import { DEPARTMENT_URL } from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getDepartmentLists: builder.query({
      query: () => ({
        url: `${DEPARTMENT_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `${DEPARTMENT_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    createDepartment: builder.mutation({
      query: (data) => ({
        url: `${DEPARTMENT_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentListsQuery,
  useDeleteDepartmentMutation,
} = departmentApiSlice;
