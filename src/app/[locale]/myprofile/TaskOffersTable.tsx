import { getData } from "@/libs/axios/server";
import { OfferTypes, TaskTypes } from "@/libs/types/types";
import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TableActionButtons from "./TableActionButtons";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { UserIcon } from "lucide-react";

const TaskOffersTable = async ({
  params,
  locale,
}: {
  params: { page: string; task: string };
  locale: string;
}) => {
  const t = await getTranslations("tasks");
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
          lang: locale,
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
    <div
      className="container mx-auto py-8"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-950 font-['Libre_Baskerville'] mb-2">
          {t("available_transfer_offers")}
        </h1>
        <p className="text-center text-black/60 text-lg font-bold font-['Libre_Baskerville']">
          {t("available_transfer_offers_description")}
        </p>
      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        {!taskData?.offers || taskData?.offers?.length === 0 ? (
          <div className="w-full md:p-8 text-center bg-white border border-zinc-300 rounded-lg">
            <p className="text-xl font-['Libre_Baskerville'] text-gray-700">
              {t("no_offers_available")}
            </p>
          </div>
        ) : (
          <table className="min-w-full xl:w-full border-collapse table-fixed">
            <thead>
              <tr className="bg-neutral-200">
                {Object.keys(taskData?.offers?.[0] || {})?.map((key) => {
                  if (key === "image" || key === "message") {
                    return null;
                  } else if (key === "id") {
                    return (
                      <th
                        key={key}
                        className="p-2.5 border text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']"
                      ></th>
                    );
                  }
                  return (
                    <th
                      key={key}
                      className="p-2.5 border text-center border-zinc-300  text-blue-950 text-2xl font-bold font-['Libre_Baskerville']"
                    >
                      {t(key)}
                    </th>
                  );
                })}
                <th className="p-2.5 w-fit border border-zinc-300 text-center text-blue-950 text-2xl font-bold font-['Libre_Baskerville']">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {taskData?.offers?.map((offer: OfferTypes, index: number) => (
                <tr key={index} className="bg-white">
                  <td className="p-2.5 border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <Link
                      href={`/companies/${offer?.company?.id}?page=about%20us`}
                    >
                      {offer?.company?.image ? (
                        <img
                          className="w-12 h-12 mx-auto"
                          src={offer?.company?.image}
                          alt={t("company_logo")}
                        />
                      ) : (
                        <UserIcon className="w-8 h-8 mx-auto" />
                      )}
                    </Link>
                  </td>
                  <td className="p-2.5 text-center border border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
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
                        {t(offer.status)}
                      </div>
                    </div>
                  </td>
                  <td className="p-2.5 border text-center border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <Link
                      href={`/companies/${offer?.company?.id}?page=about%20us`}
                      className="text-blue-950 text-xl font-bold font-['Libre_Baskerville']"
                    >
                      {offer?.company?.name}
                    </Link>
                  </td>
                  <td className="p-2.5 border w-fit border-zinc-300 text-black text-xl font-bold font-['Libre_Baskerville']">
                    <TableActionButtons
                      locale={locale}
                      id={offer.id}
                      token={token}
                      offer={offer}
                      taskDataId={taskData.id}
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
