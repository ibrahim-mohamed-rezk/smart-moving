import { getData } from "@/libs/axios/server";
import { TaskTypes } from "@/libs/types/types";
import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TableActionButtons from "./TableActionButtons";

const ServicesRequests = async ({
    locale
}: {
        locale: string
}) => {
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  const user = JSON.parse(cookiesData.get("user")?.value || "{}");

  if (!token || user.role !== "company") {
    redirect("/");
  }

  // get tasks from api
  const feachData = async () => {
    try {
      const response = await getData(
        "company/tasks",
        {},
        new AxiosHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const tasksData = await feachData();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-950 font-['Libre_Baskerville'] mb-2">
          Available transfer requests
        </h1>
        <p className="text-center text-black/60 text-lg font-bold font-['Libre_Baskerville']">
          Explore current customer requestِِs for moving services. Review each
          request&apos;s details and submit your task to provide assistance.
        </p>
      </div>

      {/* Responsive Table */}
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
                    <TableActionButtons locale={locale} id={task.id} task={task} token={token} user={user}  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ServicesRequests;
