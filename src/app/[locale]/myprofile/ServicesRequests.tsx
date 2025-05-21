import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RequestsTable from "./RequestsTable";

const ServicesRequests = async () => {
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
      <RequestsTable tasksData={tasksData} token={token} />
    </div>
  );
};

export default ServicesRequests;
