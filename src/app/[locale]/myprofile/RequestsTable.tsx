"use client";

import { useLocale } from "next-intl";
import TableActionButtons from "./TableActionButtons";
import { TaskTypes, UserDataTypes } from "@/libs/types/types";
import { useState } from "react";

const RequestsTable = ({
  tasksData,
  user,
  token,
}: {
  tasksData: TaskTypes[];
  user: UserDataTypes;
  token: string;
}) => {
  const locale = useLocale();
  const [openCollabse, setOpenCollabse] = useState(false);
  return (
    <div className="w-full overflow-x-auto">
      {!tasksData || tasksData?.length === 0 ? (
        <div className="w-full md:p-8 text-center bg-white border border-zinc-300 rounded-lg">
          <p className="text-xl font-['Libre_Baskerville'] text-gray-700">
            No Requests available at the moment.
          </p>
        </div>
      ) : (
        <table className="min-w-full xl:w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-neutral-200">
              <th className="p-2.5 border w-[100px] text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                id
              </th>
              <th className="p-2.5 border text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Name
              </th>
              <th className="p-2.5 border text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Status
              </th>
              <th className="p-2.5 w-fit border border-zinc-300 text-center text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasksData?.map((task: TaskTypes, index: number) => (
              <>
                <tr key={index} className="bg-white">
                  <td className="p-2.5 text-center border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.id}
                  </td>
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.details.title}
                  </td>

                  <td className="p-2.5 border border-zinc-300">
                    <div
                      className={`px-4 py-2 rounded-[30px] flex justify-center items-center
                      ${
                        task.status === "pending"
                          ? "bg-yellow-400/40"
                          : task.status === "accept"
                          ? "bg-green-500/40"
                          : "bg-red-600/40"
                      }`}
                    >
                      <div className="text-black text-lg font-normal font-['Libre_Baskerville']">
                        {task.status}
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 border w-fit border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <TableActionButtons
                      locale={locale}
                      id={task.id}
                      token={token}
                      user={user}
                      openCollabse={openCollabse}
                      setOpenCollabse={setOpenCollabse}
                    />
                  </td>
                </tr>
                <tr key={index} className="bg-white">
                  <td className="p-2.5 text-center border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.id}
                  </td>
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {task.details.title}
                  </td>

                  <td className="p-2.5 border border-zinc-300">
                    <div
                      className={`px-4 py-2 rounded-[30px] flex justify-center items-center
                      ${
                        task.status === "pending"
                          ? "bg-yellow-400/40"
                          : task.status === "accept"
                          ? "bg-green-500/40"
                          : "bg-red-600/40"
                      }`}
                    >
                      <div className="text-black text-lg font-normal font-['Libre_Baskerville']">
                        {task.status}
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 border w-fit border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <TableActionButtons
                      locale={locale}
                      id={task.id}
                      token={token}
                      user={user}
                      openCollabse={openCollabse}
                      setOpenCollabse={setOpenCollabse}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestsTable;
