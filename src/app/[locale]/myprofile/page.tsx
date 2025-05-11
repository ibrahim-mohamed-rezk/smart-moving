import { cookies } from "next/headers";
import PersonalInfoForm from "./PersonalInfoForm";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import ChangePassword from "./ChangePassword";
import Tasks from "./Tasks";
import TaskOffersTable from "./TaskOffersTable";

// This is now a server component
export default async function PersonalInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; task: string }>;
}) {
  const params = await searchParams;
  const cookiesData = await cookies();
  const userData = JSON.parse(cookiesData.get("user")?.value || "{}");
  const token = cookiesData.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-['libre-baskerville']">
      {/* Sidebar Component - Handles both mobile and desktop views */}
      <Sidebar userData={userData} />

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6 mt-4 md:mt-0">
        {params.page === "personal-info" && (
          <PersonalInfoForm initialData={userData} token={token} />
        )}
        {params.page === "change-password" && (
          <ChangePassword token={token} userData={userData} />
        )}
        {params.page === "tasks" && <Tasks />}
        {params.page === "task-offers" && (
          <TaskOffersTable params={params} />
        )}
      </div>
    </div>
  );
}
