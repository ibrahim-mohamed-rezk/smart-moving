import { getData } from "@/libs/axios/server";
import { OfferTypes, TaskTypes } from "@/libs/types/types";
import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TableActionButtons from "./TableActionButtons";

const TaskOffersTable = async ({
  params,
  locale,
}: {
  params: { page: string; task: string };
  locale: string;
}) => {
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  const user = JSON.parse(cookiesData.get("user")?.value || "{}");

  if (!token || user.role !== "customer") {
    redirect("/");
  }

  // get tasks from api
  const feachData = async () => {
    try {
      const response = await getData(
        "customer/offers-api",
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
  const taskData = tasksData.find(
    (item: TaskTypes) => item.id === +params.task
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-950 font-['Libre_Baskerville'] mb-2">
          Available transfer Offers
        </h1>
        <p className="text-center text-black/60 text-lg font-bold font-['Libre_Baskerville']">
          Explore current companies Offers for moving services. Review each
          request&apos;s details and select the one that best suits your needs.
        </p>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        {!taskData?.offers || taskData?.offers?.length === 0 ? (
          <div className="w-full md:p-8 text-center bg-white border border-zinc-300 rounded-lg">
            <p className="text-xl font-['Libre_Baskerville'] text-gray-700">
              No offers available at the moment.
            </p>
          </div>
        ) : (
          <table className="min-w-full xl:w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-neutral-200">
                {Object.keys(taskData?.offers?.[0] || {})?.map((key) => (
                  <th
                    key={key}
                    className="p-2.5 border text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']"
                  >
                    {key}
                  </th>
                ))}
                <th className="p-2.5 w-fit border border-zinc-300 text-center text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData?.offers?.map((offer: OfferTypes, index: number) => (
                <tr key={index} className="bg-white">
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {offer.id}
                  </td>
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {offer.offer}
                  </td>

                  <td className="p-2.5 border border-zinc-300">
                    <div
                      className={`px-4 py-2 rounded-[30px] flex justify-center items-center
                      ${
                        offer.status === "hold"
                          ? "bg-yellow-400/40"
                          : offer.status === "accept"
                          ? "bg-green-500/40"
                          : "bg-red-600/40"
                      }`}
                    >
                      <div className="text-black text-lg font-normal font-['Libre_Baskerville']">
                        {offer.status}
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    {offer.company?.name}
                  </td>
                  <td className="p-2.5 border w-fit border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <TableActionButtons
                      locale={locale}
                      id={offer.id}
                      token={token}
                      offer={offer}
                    />
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

export default TaskOffersTable;
