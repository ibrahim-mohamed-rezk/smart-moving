import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { Link } from "@/i18n/routing";
import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import TasksCards from "./tasksCards";

const Tasks = async () => {
  const cookiesData = await cookies();
  const locale = await getLocale();
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
  const t = await getTranslations("tasks");

  const tasksData = await feachData();

  return (
    <div className="w-full inline-flex flex-col justify-center items-start gap-4 md:gap-8 px-4 md:px-6">
      {!tasksData || tasksData.length <= 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className="text-blue-950 text-xl md:text-2xl font-bold font-['Libre_Baskerville'] mb-4">
            {t("no_tasks_available")}
          </div>
          <p className="text-gray-600 text-center max-w-md">
            {t(
              "You don&apos;t have any tasks yet. Your tasks will appear here once you create them."
            )}
          </p>
          <Link
            href="/services?service=private-moving&service_id=1"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {t("request_task")}
          </Link>
        </div>
      ) : (
        <>
          <TasksCards token={token} tasksData={tasksData} />
        </>
      )}
    </div>
  );
};

export default Tasks;
