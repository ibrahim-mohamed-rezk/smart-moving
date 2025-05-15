import { cookies } from "next/headers";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { redirect } from "next/navigation";

// This is now a server component
export default async function PersonalInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // const { chat } = await searchParams;
  const { locale } = await params;
  const cookiesData = await cookies();
  const userData = JSON.parse(cookiesData.get("user")?.value || "{}");
  const token = cookiesData.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className="flex items-stretch sm:p-6 mt-4 md:mt-0 md:justify-center flex-col md:flex-row h-[calc(100vh-100px)] bg-gray-50 font-['libre-baskerville']">
      {/* Sidebar Component - Handles both mobile and desktop views */}
      <Sidebar user={userData} token={token} locale={locale} />

      {/* Right Panel - Form */}
      <div className="w-full md:w-2/3 lg:w-3/4">
        <Chat token={token} user={userData} />
      </div>
    </div>
  );
}
