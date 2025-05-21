import { getData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { CompanyTypes } from "@/libs/types/types";
import { getTranslations } from "next-intl/server";

const CompaniesPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const t = await getTranslations("company");

  const fetchData = async () => {
    try {
      const response = await getData(
        "company",
        {},
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const companies = await fetchData();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Moving Companies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies &&
          companies.map((company: CompanyTypes) => (
            <div
              key={company.id}
              className="bg-white rounded-lg gap-4 shadow-md p-3 flex justify-between items-center hover:shadow-lg transition-shadow"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border border-gray-300">
                <Image
                  src={company.image === "" ? "/logo.png" : company.image}
                  alt={company.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-2 flex items-start justify-center flex-col pr-6">
                <h2 className="text-2xl font-bold text-center mb-1">
                  {company.name}
                </h2>

                <div className="text-start text-gray-700 space-y-2">
                  <p>
                    {t("address")}: {company.address},{company.postal_code}{" "}
                    {company.city}
                  </p>
                  <p className="text-start">
                    {t("phone")}: {company.phone}
                  </p>
                  <p className="text-start ">
                    {t("email")}: {company.email}
                  </p>
                </div>

                <div className="flex w-full justify-between items-center mt-2">
                  <div className="text-black font-medium flex items-center">
                    {company.reviews && company.reviews.length > 0 ? (
                      <>
                        {(
                          company.reviews.reduce(
                            (acc, review) => acc + review.rating,
                            0
                          ) / company.reviews.length
                        ).toFixed(1)}
                        <span className="text-yellow-500 ml-1">★</span>
                      </>
                    ) : (
                      <>
                        No ratings
                        <span className="text-yellow-500 ml-1">★</span>
                      </>
                    )}
                  </div>
                  <Link
                    href={`/companies/${company.id}?page=about%20us`}
                    locale={locale}
                    className="bg-[#192953] text-white px-4 py-2 rounded hover:bg-[#0F1A36] transition-colors"
                  >
                    {t("view details")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {(!companies || companies.length === 0) && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No companies found</p>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
