import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { useGetTeamListsQuery } from "../../redux/slices/api/userApiSlice.js";
import { getInitials } from "../../utils/index.js";

export default function UserList({ team, setTeam, departmentId }) {
  const { data, isLoading } = useGetTeamListsQuery({ search: "" });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamList, setTeamList] = useState([]);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el.map((el) => el._id));
  };

  useEffect(() => {
    if (team?.length < 1) {
      if (data && departmentId) {
        const filterData = data?.filter(
          (d) => d?.department?.name === departmentId
        );

        if (filterData?.length > 0) {
          setSelectedUsers([filterData[0]]);
          setTeamList(filterData);
        } else {
          console.log("No matching department found in data:", departmentId);
          setSelectedUsers([]);
          setTeamList(data);
        }
      } else {
        // Handle the case where data or departmentId is missing
        console.log("Data or departmentId is missing.");
        setTeamList(data || []); // Set to data if available, otherwise an empty array.
        setSelectedUsers([]); // Or a suitable default
      }
    } else {
      setSelectedUsers(team);
    }
  }, [isLoading, departmentId, data, team]); // Added data and team to dependency array
  console.log(teamList, data);
  return (
    <div className="">
      <p className="text-slate-900 dark:text-gray-500">Assign Task To:</p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 dark:border-gray-600 sm:text-sm">
            <span className="block truncate">
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <BsChevronExpand
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {teamList?.map((user, userIdx) => (
                <Listbox.Option
                  key={userIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`flex items-center gap-2 truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <div
                          className={
                            "w-6 h-6 rounded-full text-white flex items-center justify-center bg-violet-600"
                          }
                        >
                          <span className="text-center text-[10px]">
                            {getInitials(user.name)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
