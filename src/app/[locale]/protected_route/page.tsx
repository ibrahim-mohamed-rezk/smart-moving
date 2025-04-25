import { redirect } from "@/i18n/routing";
import { cookies } from "next/headers";

export default async function DashboardPage({
  params,
}: {
  params: { locale: string };
}) {
  const token = (await cookies()).get("token")?.value;
  const { locale } = params;

  if (!token) {
    redirect({ href: "/login", locale });
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
