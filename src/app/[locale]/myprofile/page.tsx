import { cookies } from "next/headers";
import PersonalInfoForm from "./PersonalInfoForm";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import ChangePassword from "./ChangePassword";
import Tasks from "./Tasks";

// This is now a server component
export default async function PersonalInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string}>;
  }) {
  const {page} = await searchParams;
  const cookiesData = await cookies();
  const userData = JSON.parse(cookiesData.get("user")?.value || "{}");
  const token = cookiesData.get("token")?.value;
  
  if (!token) {
    redirect("/")
  }
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-['libre-baskerville']">
      {/* Sidebar Component - Handles both mobile and desktop views */}
      <Sidebar userData={userData} />

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6 mt-4 md:mt-0">
        {page === "personal-info" && (
          <PersonalInfoForm initialData={userData} token={token} />
        )}
        {page === "change-password" && <ChangePassword token={token} userData={userData} />}
        {page === "tasks" && <Tasks />}
      </div>
    </div>
  );
}
